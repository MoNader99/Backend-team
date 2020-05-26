const multer = require("multer");
var{artist}= require("./../models/artists.js");  //artists model
var{track}=require("./../models/track.js");
const path = require('path');
//
var newTrackPath=undefined;



const multerStorage= multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"./tracks")
    },
    filename:(req,file,cb)=>{
        cb(null,newTrackPath);
    }
});

var artistId2;
const multerFilter =(req,file,cb)=>{
    if(!req.body.AlbumName || !req.body.genre){
        req.fileError=400;
        cb(null,false);
        return;
    }
    if(file){
        var token = req.header('x-auth');
        artist.findByToken(token).then((myartist)=>{
            artistId2= myartist._id; 
            if(file.mimetype.split('/')[0]=="audio"){
                const ext=file.mimetype.split('/')[1];
                newTrackPath=path.parse(file.originalname).name+"--"+artistId2+"."+"mp3";
                var trackInstance=new track({
                    artistId:artistId2,
                    trackName:path.parse(file.originalname).name,
                    genre:req.body.genre,
                    type:"Album",
                    trackPath:newTrackPath
                    });
                    trackInstance.save().then((res)=>{
                    console.log(res._id);
                    },(err)=>{
                            console.log(err);
                });
                cb(null,true);                                 
            }
            else{
                req.fileError=400;
                cb(null,false);
            }
        }).catch((e)=>{req.fileError=400; cb(null,false);})
    }   
}

const upload= multer({
    fileFilter:multerFilter,
    storage:multerStorage,
    limits:{
        fileSize:15*950*1024 ,    //max song size is 10 mins
        
    }
});



exports.uploadAlbum=upload.array('multipleTracks',12);


