const express= require('express');
const multer = require("multer");
var upload=require("./uploadAlbum.js").uploadAlbum;
var service = require("./AlbumServices.js");
var bodyParser= require('body-parser');
var { mongoose } = require("./../db/mongoose.js"); 
var{artist}= require("./../models/artists.js");  //artists model
var{notification}=require("./../models/notifications.js");//notifications model
mongoose.Promise = global.Promise;

var app=express();



app.post('/album/newRelease', upload, async (req,res,next) =>
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

if(!module.parent){
    app.listen(8000,()=>{
        console.log("Started on port 8000 create album");
    });
}

module.exports={app};
