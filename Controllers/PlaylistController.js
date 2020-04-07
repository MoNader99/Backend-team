const express=require('express');
var { mongoose } = require("../db/mongoose.js");
const{track}=require("../models/track");
var {playlist} = require("../models/playlists.js");
var {User} = require("../models/users.js");


const {ObjectID}=require('mongodb');

const router=express.Router();



//app.listen(3000,()=>{console.log('started on port 3000');});


//CREATE A NEW PLAYLIST
router.post('/playlists',(req,res)=>{
    
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        if(!req.body.playlistName){
            return res.status(400).send("Playlist must have a name");
        }
        


        //PREVENT THE USER FROM HAVING 2 PLAYLISTS WITH THE SAME NAME
        var userId2=user._id;
        playlist.find({$and:[{userId:userId2},{playlistName:req.body.playlistName }]}).then((myduplicate)=>{
            if(myduplicate.length==0){
                var playlistInstance = new playlist({
                    userId:userId2,     
                    playlistName: req.body.playlistName,
                    privacy: req.body.privacy,
                    
                },(e)=>{
                    return res.status(500).send("Coult not create playlist");
                });
            
                playlistInstance.save().then((doc)=>{
                    res.status(201).send(doc);  
                }).catch((e)=>{
                    res.status(500).send("Could not save the playlist");
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


//Get a User Playlist Request
router.get('/playlists/me',(req,res) => {
    var token = req.header('x-auth');
    if(!token)
    {
        return res.status(401).send('Token is Empty');
    }
    User.findByToken(token).then((user) => {
        if(!user){
            return res.status(401).send('User does not have access or does not exist');
        }
        playlist.find({userId:user._id}).then((playlist) =>
        {
            return res.status(302).send({playlist});
        }).catch((e) => {
            return res.status(401).send();
        })
    }).catch((e) => {
        res.status(401).send();
    })
})    



//DELETE A PLAYLIST
router.delete('/playlists',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
    var userId2=user._id;     // id of the owner of the playlist 
    if(!req.body.playlistName){
        return res.status(400).send("Pass the playlistname to delete");
    }
    var playlistName=req.body.playlistName;
    playlist.findOneAndRemove({$and:[{userId:userId2},{playlistName:playlistName }]}).then((delPlaylist)=>{
        if(!delPlaylist){
            
            return res.status(404).send('No playlist found to delete');
        }
        
        res.status(200).send("Playlist deleted succsesfully");

    }).catch((e)=>{
        res.status(500).send("Could not delete playlist");
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});


//DELETE TRACKS FROM A PLAYLIST
router.delete('/playlists/tracks',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
    var userId2=user._id;     // id of the owner of the playlist 
    if(!req.body.playlistName){
        return res.status(400).send("Pass the playlistname that you want to delete a track from");
    }
    if(!req.body.trackId){
        return res.status(400).send("Pass the track id that you want to delete");
    }
    var trackId= req.body.trackId
    if(!ObjectID.isValid(trackId)){
        return res.status(404).send("Invalid Track Id");   
    }

    var playlistName=req.body.playlistName;
    playlist.findOne({$and:[{userId:userId2},{playlistName:playlistName }]}).then((delPlaylist)=>{
        if(!delPlaylist){
            
            return res.status(404).send('Playlist not found');
        }
        
        playlist.findOne({$and:[{tracks:{$eq:trackId}},{playlistName:playlistName }]}).then((delTrack1)=>{
            if(!delTrack1){
                return res.status(400).send("Track is not in the playlist");
            }
            else{
                var tracksarr= delTrack1.tracks;
                for(var count=0 ; count<tracksarr.length;count++){
                    if(tracksarr[count]==trackId){
                        var temptrack=tracksarr[count];
                        for (var count2=count ; count2<tracksarr.length-1 ; count2++){
                            tracksarr[count2]=tracksarr[count2+1]
                        }
                       tracksarr.pop();
                    }
                }
                playlist.findOneAndUpdate({$and:[{userId:userId2},{playlistName:playlistName }]},{ $set: { tracks:tracksarr  } }).then((res)=>{
                    
                    
                });
                res.status(200).send("Track is successfully deleted from playlist");
                
            }

        });

    }).catch((e)=>{
        res.status(500).send("Could not remove the track from the playlist");
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});
//GET PLAYLIST COVER IMAGE

router.get('/playlists/image',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            
            return Promise.reject();
        }
    var userId2=user._id;
    var pName = req.header('playlistName');
    if(!pName){
        return res.status(400).send("Pass the playlistname to get it's image");
    }
    playlist.findOne({$and:[{userId:userId2},{playlistName:pName}]}).then((fetched)=>{
        if(!fetched){
            return res.status(404).send('Playlist does not exist');
        }
        res.status(302).send(fetched.imagePath);
    }).catch((e)=>{
        res.status(500).send("Could not send the image");
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});



module.exports=router;
