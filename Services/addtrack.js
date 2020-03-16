//library imports
const express= require('express');
var bodyParser= require('body-parser');
const {ObjectID}=require("mongodb");

//local imports
var{mongoose}= require("./../db/mongoose.js");  
var{track}=require("./../models/track.js");
var{artist}= require("./../models/Artists.js");  //artists model


///////////
var app=express();
//configures the middlewear
app.use(bodyParser.json());

//post fn takes the url as first paramter and a call back fn 
//the user id is to be passed in the url to know whom this playlist belongs to
app.post('/tracks/me',(req,res)=>{
    var token = req.header('x-auth');
    artist.findByToken(token).then((myartist)=>{
        if(!myartist){
            return Promise.reject();
        }
        var atristId2= myartist._id;   
        console.log("Here "+atristId2); 
        track.find({$and:[{artistId:atristId2},{trackName:req.body.trackName }]}).then((trackduplicate)=>{
            if(trackduplicate.length==0){
                console.log("empty");
                var trackInstance = new track({
                    artistId: atristId2,
                    trackName: req.body.trackName,
                    duration:req.body.duration,
                    url:req.body.url

                },(e)=>{
                    res.status(401).send("Coult not add Track ("+req.body.trackName+")");
                });
            
                trackInstance.save().then((doc)=>{
                    res.send(doc._id);  // you can send back the whole document or just the id of the created playlist
                }).catch((e)=>{
                    res.status(401).send("Coult not add Track ("+req.body.trackName+")");
                });
                
            }
            else if(trackduplicate.length!=0){
                return res.status(400).send("Cannot create 2 Tracks with the same name ("+req.body.trackName+") for the same artist");
            };
        });

    
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});

    


app.listen(3000,()=>{
    console.log("Started on port 3000");
});

module.exports={app};


