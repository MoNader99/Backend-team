const express=require('express');
var { mongoose } = require("../db/mongoose.js");
const{track}=require("../models/track");
var {playlist} = require("../models/playlists.js");
var {User} = require("../models/users.js");

const {ObjectID}=require('mongodb');

const app=express();



app.listen(3000,()=>{console.log('started on port 3000');});


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