const express= require('express');
const multer = require("multer");
var upload=require("./uploadAlbum.js").uploadAlbum;
var bodyParser= require('body-parser');
var { mongoose } = require("./../db/mongoose.js"); 
var{artist}= require("./../models/artists.js");  //artists model
var {album} = require("./../models/album.js");
var{track}=require("./../models/track.js");
var{notification}=require("./../models/notifications.js");//notifications model
mongoose.Promise = global.Promise;
const path = require('path');
var app=express();

app.post('/album/newRelease', upload, async (req,res,next) =>
{
    var token = req.header('x-auth');
    const files = req.files;
    artist.findByToken(token).then((myartist)=>{
    
        if(!req.body.AlbumName){
            return res.status(400).send("Missing albumName");
        }
        if(!req.body.genre){
            return res.status(400).send("Missing genre");
        }
        if(!files)
        {
            const error = new Error ("Please Pass the files");

            error.httpStatusCode = 400;
            return next(error);
        }
        var albumInstance = new album({
            artistId:myartist._id,
            albumName:req.body.AlbumName,
        });
        albumInstance.save().then((res)=>{
            console.log(res._id);
        },(err)=>{
            console.log(err);
        });
        var i = 0;
        while(files[i])
        {
            console.log("d5alt");
            var trackpath = files[i].originalname;
            await track.findOne({trackPath:trackpath}).then((myTrack) =>
            {
                albumInstance.tracks[i]=myTrack;
                console.log("what is inside "+i+" "+albumInstance.tracks[i]);
                albumInstance.save().then((res)=>{
                    console.log(res._id);
                },(err)=>{
                    console.log(err);
                });
            })
            i++;
        }
    
    })

      
    
    var notificationInstance = new notification({
        text:myartist.artistName+" released a new Album ("+req.body.AlbumName +")",
        sourceId:myartist._id,
        userType:"artist"
        
    });
    notificationInstance.save();
    

   

    return res.status(201).send(files); 

});

if(!module.parent){
    app.listen(8000,()=>{
        console.log("Started on port 8000 create album");
    });
}

module.exports={app};
