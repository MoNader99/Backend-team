//library imports
const express= require('express');
var bodyParser= require('body-parser');
const multer = require("multer");
//local imports
var { mongoose } = require("./../db/mongoose.js"); 
var{track}=require("./../models/track.js");
var{artist}= require("./../models/artists.js");  //artists model
var upload=require("./uploadTrack.js").uploadTrack;
var{notification}=require("./../models/notifications.js");//notifications model

///////////
var app=express();

app.post('/tracks/single',upload,(req,res)=>{
        var token = req.header('x-auth');
        artist.findByToken(token).then((myartist)=>{
        var atristId2= myartist._id; 
        var artistName=myartist.artistName;
        if(!req.body.trackName){
            return res.status(400).send("Missing trackName");
        }
        if(!req.body.genre){
            return res.status(400).send("Missing genre");
        }
        if(!req.file){  // no file is sent
            return res.status(401).send('Please upload a track');
        }
        if(req.fileError){    // the upladed file is not a track
            return res.status(401).send('Please upload a track');
        }
        track.find({$and:[{artistId:atristId2},{trackName:req.body.trackName }]}).then((trackduplicate)=>{
                if(trackduplicate.length!=0){  //409 is code for conflict
                    return res.status(409).send("Cannot create 2 Tracks with the same name ("+req.body.trackName+") for the same artist");
                };
                var not2 = new notification({
                    text:artistName+" released a new Song ("+req.body.trackName +")",
                    sourceId:atristId2,
                    userType:"artist"
                    
                });
                not2.save();
                var trackInstance = new track({
                    artistId: atristId2,
                    trackName: req.body.trackName,
                    genre:req.body.genre,
                    trackPath:req.body.trackName+"--"+atristId2+"."+"mp3"

                },(e)=>{
                    res.status(500).send("Coult not add Track ("+req.body.trackName+")");
                });
                trackInstance.save().then((doc)=>{
                    res.status(201).send(doc);  
                }).catch((e)=>{
                    res.status(500).send("Coult not add Track ("+req.body.trackName+")");
                });
            });

    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});

    

if(!module.parent){
    app.listen(8000,()=>{
        console.log("Started on port 8000");
    });
}

module.exports={app};


