const express=require('express');
var { mongoose } = require("../db/mongoose.js");
const{track}=require("../models/track");
var bodyParser= require('body-parser');
var {album} = require("../models/album.js");
var { User } = require("../models/users.js");
const jwt = require('jsonwebtoken');
var{artist}= require("./../models/artists.js");
var service = require("./../Services/AlbumServices.js");
var upload=require("./../Services/uploadAlbum.js").uploadAlbum;
var{notification}=require("./../models/notifications.js");//notifications model
const {ObjectID}=require('mongodb');
mongoose.Promise = global.Promise;

const router = express.Router();
var AuthenticationServices = require("./../Services/AuthenticationService");
//edit image imports
var uploadImagefn=require("./../Services/ImageService.js").upLoadPhoto;
var upload2=require("./../Services/ImageService.js").UploadUserPhoto;
var AuthenticateArtistAlbum= require("./../Services/ImageService.js").AuthenticateArtistAlbum;
var AssignAlbumImage=require("./../Services/ImageService.js").AssignAlbumImage;
//

//EDIT ALBUM COVER IMAGE
router.post("/album/coverimage",AuthenticateArtistAlbum,upload2,reSizeUserImage,uploadImagefn,AssignAlbumImage);

/////Get Album Tracks

router.get('/album/tracks/:id', (req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send("invalid id");
    }
    
    album.findById(id , 'tracks').then((album) => {
        if(!album){return res.status(404).send("can not find album");}
        return res.send({album});
    }).catch((e)=>res.status(400).send());
    
    });

///// Get Album
    router.get('/album/:id', (req,res)=>{
        var id=req.params.id;
        var token = req.header('x-auth');
        if(!token)
        {
            return res.status(401).send('You should pass the token');
        }
        User.findByToken(token).then((user)=>{
            if(!user){
                return res.status(401).send('User does not have access or does not exist');
            }
        album.findById(id).then((album) => {
            if(!album){return res.status(404).send("can not find album");}
            artist.findById(album.artistId).then((myartist) =>
            {    var returnedAlbum ={};
                 returnedAlbum ={
                     _id:album._id,
                     albumName:album.albumName,
                     imagePath:album.imagePath,
                     artistName:myartist.artistName,
                     tracks:album.tracks,
                     likes:album.likes
                 }
                 return res.status(302).send({returnedAlbum});
            }).catch((e)=>res.status(404).send());
            
        }).catch((e)=>res.status(404).send());
    }).catch((e)=>res.status(401).send());
        });  
        
        


        
router.delete('/album/:id/delete', AuthenticationServices.AuthenticateArtists, (req, res) => {
    var id = req.params.id;
    var decoded = req.token;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("invalid id");
    }
    album.deletebyartist(decoded._id, id).then((str) => {
        console.log(str);
        console.log("404");
        console.log("404");
        return res.status(200).send(str);
    }).catch((err) => {
        console.log("hena");
        console.log(err);
        if (err === "Notfound") {
            console.log("notfound");
            return res.status(404).send(err);
        }
        else if (err === "NotAuthorized") {
            console.log("403");
            return res.status(403).send(err);
        }
        else {
            console.log("404");
            return res.status(404).send(err);
        }
    });
});


///////// Like album /////////////
router.post('/album/like/unlike/:id',async (req, res) => {
    var albumId = req.params.id;
    var token = req.header('x-auth');
    if(!token)
    {
        return res.status(401).send('Token is Empty');
    }
    if(!ObjectID.isValid(albumId))
    {
        return res.status(404).send("Invalid id");
    }
    album.findOne({_id:albumId}).then((album) => {
        if(!album){
            res.status(404).send('No album found');
        }
        User.findByToken(token).then((user) =>{
            if(!user)
            {
                return res.status(401).send('Token is not valid');
            }
            var i = 0;
                while(user.likedAlbums[i])
                {
                    if(album._id.toString()===user.likedAlbums[i].toString()) {
                    user.likedAlbums.splice(i,1);
                    user.markModified('likedAlbums')
                    user.save();
                    album.likes--;
                    album.markModified('likes')
                    album.save();
                    return res.status(200).send('Unlike');
                    }
                    i++;
                };
                user.likedAlbums[i]=ObjectID(album._id.toString());
                user.markModified('likedAlbums')
                user.save();
                album.likes++;
                album.markModified('likes')
                album.save();
                res.status(200).send("Like");
        }).catch((e) =>
        {
            res.status(401).send('Token is not valid');
        })
    }).catch((e) =>
    {
        res.status(500).send();
    })
});

//// Create Album ////
router.post('/album/newRelease', upload, async (req,res,next) =>
{
    var token = req.header('x-auth');
    const files = req.files;
    await artist.findByToken(token).then((myartist)=>{
    
        if(!req.body.AlbumName){
            return res.status(400).send("Missing albumName");
        }
        if(!req.body.genre){
            return res.status(400).send("Missing genre");
        }
        if(!files)
        {
            return res.status(400).send('Please upload a track');
        }
        if(req.fileError){    // the upladed file is not a track
            return res.status(400).send('Please upload audio files');
        }
        service.newAlbum(myartist._id,req.body.AlbumName,files);

        var notificationInstance = new notification({
            text:myartist.artistName+" released a new Album ("+req.body.AlbumName +")",
            sourceId:myartist._id,
            userType:"artist"
            
        });
        notificationInstance.save();

        res.status(201).send(files); 
    
    }).catch((e) =>
    {
        res.status(401).send();
    })

});


// if(module.parent){
//     app.listen(3000,()=>{
//         console.log("Started on port 3000");
//     });
// }

module.exports= router;