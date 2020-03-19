const express= require('express');
var bodyParser= require('body-parser');
const {ObjectID}=require("mongodb");

//local imports
var{mongoose}= require("./../db/mongoose.js");  
var{playlist}= require("./../models/playlists.js"); // playlists model
var{User}= require("./../models/users.js"); // users model

///////////
var app=express();
//configures the middlewear
app.use(bodyParser.json());

app.get('/playlists',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            console.log("ddd");
            return Promise.reject();
        }
    var userId2=user._id;
    if(!req.body.playlistName){
        return res.status(400).send("Pass the playlistname to get it's image");
    }
    var pName = req.body.playlistName;
    playlist.findOne({$and:[{userId:userId2},{playlistName:pName}]}).then((fetched)=>{
        if(!fetched){
            return res.status(404).send('Playlist does not exist');
        }
        res.status(302).send(fetched.image);
    }).catch((e)=>{
        res.status(400).send();
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});

  
app.listen(3000,()=>{
    console.log("Started on port 3000GO");
});


