const express=require('express');
var { mongoose } = require("../db/mongoose.js");
const{track}=require("../models/track");
var {album} = require("../models/album.js");
var { User } = require("../models/users.js");
const jwt = require('jsonwebtoken');

var ArtistServices = require("./../Services/AlbumServices.js");

const {ObjectID}=require('mongodb');

const router = express.Router();
var AuthenticationServices = require("./../Services/AuthenticationService");





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
            res.status(401).send('You should pass the token');
        }
        User.findByToken(token).then((user)=>{
            if(!user){
                return Promise.reject();
            }
        album.findById(id).then((album) => {
            if(!album){return res.status(404).send("can not find album");}
            return res.status(302).send({album});
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
router.post('/album/like/:id',(req, res) => {
    var albumId = req.params.id;
    var token = req.header('x-auth');
    console.log('token = '+ token)
    if(!token)
    {
        console.log('da5alt');
        res.status(401).send('Token is Empty');
    }
    console.log('md5ltsh');
    if(!ObjectID.isValid(albumId))
    {
        return res.status(404).send("Invalid id");
    }
    album.findOne({_id:albumId}).then((album) => {
    if(!album){
        res.status(404).send('No album found');
    }
    })
    User.findByToken(token).then((user) =>{
        if(!user)
        {
            res.status(401).send('Token Invalid');
        }
        console.log('user was found');
        var len =user.likedAlbums.length;
        if(len == 0)
        {
            user.likedAlbums[0]=ObjectID(albumId.toString());
            user.markModified('likedAlbums')
            user.save();
            album.findOne({_id:albumId}).then((album) => {
                album.likes = album.likes +1;
                album.markModified('likes');
                album.save();
                })
            res.status(200).send();
        }
        else{
        for(var i = 0;i<len;i++)
        {
            if(albumId==user.likedAlbums[i])
            {
                return res.status(403).send('You have already liked that album');   
            }
        }
        user.likedAlbums[len]=ObjectID(albumId.toString());
        user.markModified('likedTracks')
        user.save();
        album.findOne({_id:albumId}).then((album) => {
            album.likes = album.likes +1;
            album.markModified('likes');
            album.save();
            })
        res.status(200).send();
        }
    }) 
});


// if(module.parent){
//     app.listen(3000,()=>{
//         console.log("Started on port 3000");
//     });
// }

module.exports= router;