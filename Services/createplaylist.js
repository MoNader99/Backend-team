//library imports
const express= require('express');
var bodyParser= require('body-parser');
const {ObjectID}=require("mongodb");

//local imports
var{mongoose}= require("./../db/mongoose.js");  
var{playlist}= require("./../models/playlists.js"); // playlists model
var{User}= require("./../models/users.js"); // users model
var{images}= require("./../models/images.js"); // images model

//const image1=require("./../demo");




///////////
var app=express();
//configures the middlewear
app.use(bodyParser.json());

//post fn takes the url as first paramter and a call back fn 
//the user id is to be passed in the url to know whom this playlist belongs to
app.post('/playlists',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        if(!req.body.playlistName){
            return res.status(400).send("Playlist must have a name");
        }
        var savedImage;
        if(req.body.image){
            images.findOne({url:req.body.image.url}).then((isImage)=>{
                    if(!isImage){
                            savedImage= new images ({
                            url:req.body.image.url,
                            height:req.body.image.height,
                            width:req.body.image.width,});
                            savedImage.save();
                        }
                        else if(isImage){
                            savedImage=isImage
                        }
                });
            }
            if(!req.body.image){
                //savedImage= image1;  to be uncommented
                // TO BE SET WITH THE DEFAULT IMAGE (IMAGE1) FROM DEMO
                return res.send("no Image");
            }
  
        //PREVENT THE USER FROM HAVING 2 PLAYLISTS WITH THE SAME NAME

        var userId2=user._id;
        playlist.find({$and:[{userId:userId2},{playlistName:req.body.playlistName }]}).then((myduplicate)=>{
            if(myduplicate.length==0){
                var playlistInstance = new playlist({
                    userId:userId2,     
                    playlistName: req.body.playlistName,
                    privacy: req.body.privacy,
                    image:savedImage,
                   // href:playlistInstance.href         // to be uncommented when href is known
                },(e)=>{
                    return res.status(400).send("Coult not create playlist due to missing info");
                });
            
                playlistInstance.save().then((doc)=>{
                    myduplicate=[];
                    res.send(doc);  
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


