//library imports
const express= require('express');
var bodyParser= require('body-parser');
const {ObjectID}=require("mongodb");

//local imports
var{mongoose}= require("./../db/mongoose.js");  
var{track}=require("./../models/track.js");
var{artist}= require("./../models/Artists.js");  //artists model
var{images}= require("./../models/images.js"); // images model


///////////
var app=express();
//configures the middlewear
app.use(bodyParser.json());

//post fn takes the url as first paramter and a call back fn 
//the user id is to be passed in the url to know whom this playlist belongs to
app.post('/tracks',(req,res)=>{
    var token = req.header('x-auth');
    artist.findByToken(token).then((myartist)=>{
        if(!myartist){
            return Promise.reject();
        }
        var atristId2= myartist._id;   
        if(!req.body.trackName){
            return res.status(400).send("Track name is required");
        }
        if(!req.body.genre){
            return res.status(400).send("Track genre is required");
        }
        if(!req.body.image){
           return  res.status(400).send("Track image is required");
        }
        if(!req.body.url){
            return res.status(400).send("Track url is required");
        }
        if(!req.body.duration){
            return res.status(400).send("Track duration is required");
        }
        //IF HEIGHT AND WIDTH ARE NOT REQUIRED -> TO BE REMOVED FROM THE OR CONDITION HERE
        if(!req.body.image.height || !req.body.image.width || !req.body.image.url){
            return res.status(400).send("Image Info of track has to be provided");
        }

        track.findOne({url:req.body.url}).then((duptrackurl)=>{
            if(duptrackurl){
                return res.status(409).send("This track is already created");
                
            }
            var savedImage;
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
    
    
    
            track.find({$and:[{artistId:atristId2},{trackName:req.body.trackName }]}).then((trackduplicate)=>{
                if(trackduplicate.length==0){
                        var trackInstance = new track({
                        artistId: atristId2,
                        trackName: req.body.trackName,
                        duration:req.body.duration,
                        url:req.body.url,
                        image:savedImage,
                        genre:req.body.genre,
    
                    },(e)=>{
                        res.status(500).send("Coult not add Track ("+req.body.trackName+")");
                    });
                
                    trackInstance.save().then((doc)=>{
                        res.status(201).send(doc);  
                    }).catch((e)=>{
                        res.status(500).send("Coult not asedd Track ("+req.body.trackName+")");
                    });
                    
                }
                else if(trackduplicate.length!=0){  //409 is code for conflict
                    return res.status(409).send("Cannot create 2 Tracks with the same name ("+req.body.trackName+") for the same artist");
                };
            });
            

        });



    
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


