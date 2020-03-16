const express=require('express');
var { mongoose } = require("../db/mongoose.js");
const{track}=require("../models/track");
var {album} = require("../models/album.js");
var { User } = require("../models/users.js");
const jwt = require('jsonwebtoken');

var ArtistServices = require("./../Services/AlbumServices.js");

const {ObjectID}=require('mongodb');

const app=express();



app.listen(3000,()=>{console.log('started on port 3000');});

app.get('/album/tracks/:id', (req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send("invalid id");
    }
    
    album.findById(id , 'tracks').then((album) => {
        if(!album){return res.status(404).send("can not find playlist");}
        return res.send({album});
    }).catch((e)=>res.status(400).send());
    
    });

app.delete('/album/:id/delete', (req, res) => {
    var token = req.header('x-auth');
    try {
        var decoded = jwt.verify(token, 'secretkeyforartist')
    }
    catch (error){
        console.log(error);
        return res.status(404).send("NotArtist");
    }
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("invalid id");
    }
    album.deletebyartist(decoded._id, id).then((str) => {
        console.log(str);
        return res.status(200).send(str);
    }).catch((err) => {
        console.log(err);
        return res.status(404).send(err);
    });
});