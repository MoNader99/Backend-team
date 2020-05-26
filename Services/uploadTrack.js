const multer = require("multer");
var{artist}= require("./../models/artists.js");  //artists model
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

var atristId2;
const multerFilter =(req,file,cb)=>{
    if(!req.body.trackName || !req.body.genre){
        req.fileError=400;
        cb(null,false);
        return;
    }
    if(file){
        var token = req.header('x-auth');
        artist.findByToken(token).then((myartist)=>{
            atristId2= myartist._id; 
            if(file.mimetype.split('/')[0]=="audio"){
                const ext=file.mimetype.split('/')[1];
                newTrackPath=req.body.trackName+"--"+atristId2+"."+"mp3";
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


exports.uploadTrack=upload.single('track');



