const express=require('express');
var { mongoose } = require("../db/mongoose.js");
const{track}=require("../models/track");
var {playlist} = require("../models/playlists.js");
var {User} = require("../models/users.js");

const {ObjectID}=require('mongodb');

const app=express();



app.listen(3000,()=>{console.log('started on port 3000');});

// app.get('/playlists/:id', (req,res)=>{
//     var id=req.params.id;
//     if(!ObjectID.isValid(id))
//     {
//         return res.status(404).send("invalid id");
//     }
    
//     playlist.findById(id).then((playlists)=>{
//         if(!playlists){return res.status(404).send("can not find playlist");}
//         res.send({playlists})
    
//     }).catch((e)=>res.status(400).send());
    
//     });

//Get a User Playlist Request
app.get('/playlists/me',(req,res) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        playlist.find({userId:user._id}).then((playlist) =>
        {
            if(!playlist){
                return Promise.reject();
            }
            res.send({playlist});
        }).catch((e) => {
            res.status(401).send();
        })
    }).catch((e) => {
        res.status(401).send();
    })
})    