//library imports
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

//post fn takes the url as first paramter and a call back fn 
//the user id is to be passed in the url to know whom this playlist belongs to
app.post('/playlists/me',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        //PREVENT THE USER FROM HAVING 2 PLAYLISTS WITH THE SAME NAME
        //var userId2=  "5e6f6cc7633318fc3e8ab171" ;  //TO BE REPLACED BY THE ORIGINAL ID FROM userId Object           //HEREEEEE
        var userId2=user._id;
        playlist.find({$and:[{userId:userId2},{playlistName:req.body.playlistName }]}).then((myduplicate)=>{
            if(myduplicate.length==0){
                var playlistInstance = new playlist({
                    userId:userId2,     //TO BE CHANGED WITH THE ACTUAL USER ID                         //HEREEEE
                    playlistName: req.body.playlistName,
                    privacy: req.body.privacy
                   // href:playlistInstance.href         // to be uncommented when href is known
                },(e)=>{
                    return res.status(400).send("Coult not create playlist");
                });
            
                playlistInstance.save().then((doc)=>{
                    myduplicate=[];
                    res.send(doc._id);  // you can send back the whole document or just the id of the created playlist
                }).catch((e)=>{
                    myduplicate=[];
                    res.status(401).send("Could not Create a new playlist");
                });
                
            }
            else if(myduplicate.length!=0){
                return res.status(400).send("Cannot create 2 playlists with the same name");
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


