const express=require('express');
var { mongoose } = require("../db/mongoose.js");
const{track}=require("../models/track");
var {album} = require("../models/album.js");
var { User } = require("../models/users.js");
const jwt = require('jsonwebtoken');

var ArtistServices = require("./../Services/AlbumServices.js");

const {ObjectID}=require('mongodb');

const app=express();
var AuthenticationServices = require("./../Services/AuthenticationService");



app.listen(3000,()=>{console.log('started on port 3000');});

/////Get Album Tracks

app.get('/album/tracks/:id', (req,res)=>{
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
    app.get('/album/:id', (req,res)=>{
        var id=req.params.id;
        if(!ObjectID.isValid(id))
        {
            return res.status(404).send("invalid id");
        }
        
        album.findById(id).then((album) => {
            if(!album){return res.status(404).send("can not find album");}
            return res.send({album});
        }).catch((e)=>res.status(400).send());
        
        });    

app.delete('/album/:id/delete',AuthenticationServices.AuthenticateArtists, (req, res) => {
    var id = req.params.id;
    var decoded = req.token;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("invalid id");
    }
    album.deletebyartist(decoded._id, id).then((str) => {
        console.log(str);
        return res.status(200).send(str);
    }).catch((err) => {
        console.log(err);
        if (err = "Notfound") return res.status(404).send(err);
        if (err = "NotAuthorized") return res.status(403).send(err);
    });
});