//library imports
const express= require('express');
const {ObjectID}=require("mongodb");  // if the id is autogenerated we have to use the ObjectID as it is not a string it is an objectid
var bodyParser= require('body-parser');


var{mongoose}= require("./../db/mongoose.js");  
var{track}=require("./../models/track.js");
var{artist}= require("./../models/Artists.js");  //artists model


var app=express();
//configures the middlewear
app.use(bodyParser.json());

app.delete('/tracks',(req,res)=>{
    var token = req.header('x-auth');
    artist.findByToken(token).then((myartist)=>{
        if(!myartist){
            return Promise.reject();
        }
    var atristId2= myartist._id; 
    if(!req.body.trackName){
        return res.status(400).send("Pass the track name to delete");
    }  
    var trackName1=req.body.trackName ;  //track name
    

    track.findOneAndRemove({$and:[{artistId: atristId2},{trackName:trackName1 }]}).then((delTracks)=>{
        if(!delTracks){
            
            return res.status(404).send('Track not found to be deleted');
        }
        
        res.status(204).send("Track "+trackName1+" was deleted succsesfully");

    }).catch((e)=>{
        res.status(500).send("Could not delete track");
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});




if(!module.parent){
    app.listen(3000,()=>{
        console.log("Started on port 3000");
    });
}
module.exports={app};


