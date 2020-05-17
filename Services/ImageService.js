//global
const multer = require('multer');
const express= require("express");
const sharp=require("sharp");
var { mongoose } = require("./../db/mongoose.js"); 
//////local
var bodyParser= require('body-parser');
var{User}= require("./../models/users.js"); // users model
var{artist}= require("./../models/artists.js");  //artists model
var{track}= require("./../models/track.js");  //tracks model
var{album}= require("./../models/album.js");  //albums model
const {ObjectID}=require('mongodb');

////////vars
var userId=undefined
var imageName=undefined;
var type=undefined;   //wether an artist or a user or a request to change track image
var trackName2=undefined;
var newImagePath=undefined;
var albumId=undefined;
///////
const multerStorage = multer.memoryStorage();  // for image to be stored as a buffer in memory to be able to resize it before saving it in the file

const multerFilter=(req,file,cb)=>{   
    if(file){
        if(file.mimetype.startsWith('image')){
            cb(null,true);
        }
        else{
            req.fileError=400;
            cb(null,false);
        }
    }
};


///CONFIGURES THE DEST OF THE UPLOAD 
const upload = multer({
    storage:multerStorage,
    fileFilter: multerFilter
});
//
exports.UploadUserPhoto=upload.single('photo');

exports.reSizeUserImage= reSizeUserImage = async (req,res,uploadImagefn)=>{
    if(req.file){
        imageName=userId+Date.now()+".png"
        req.file.filename=imageName;
        newImagePath="./Pictures/"+imageName;
        sharp(req.file.buffer)
        .resize(600,600)               //default is centre allignment
        .toFormat("png")
        .png({quality:90})
        .toFile(newImagePath)
        uploadImagefn();    
    }
    else{
        return res.status(400).send("Please Upload an image");
    }
};
//
exports.upLoadPhoto = uploadImagefn= async (req,res)=>{
    if(req.fileError){return res.status(400).send("Not an image , please upload an image");}
    if(type=="user"){AssignUserImage(req,res);}
    if(type=="artist"){AssignArtistImage(req,res);}
    if(type=="track"){AssignTrackImage(req,res);}
    if(type=="album"){AssignAlbumImage(req,res);}
};
//

exports.AssignUserImage =AssignUserImage= async(req, res)=>{
    User.findByIdAndUpdate({_id:userId},{$set:{imagePath:imageName}}).then((n)=>{
            res.status(200).send("Image changed successfully");
    });
    

}

exports.AssignArtistImage =AssignArtistImage= async(req, res)=>{
    artist.findByIdAndUpdate({_id:userId},{$set:{imagePath:imageName}}).then((n)=>{
            res.status(200).send("Image changed successfully");
    });
    

}

exports.AssignTrackImage =AssignTrackImage= async(req, res)=>{
    track.findOneAndUpdate({$and:[{artistId:userId},{trackName:trackName2}]},{$set:{imagePath:imageName}}).then((n)=>{
            if(n){return res.status(200).send("Track Image changed successfully");}
    }).catch((e)=>{
        return res.status(500).send("Could not change track profile picture");
    });
}

exports.AssignAlbumImage =AssignAlbumImage= async(req, res)=>{
    album.findByIdAndUpdate({_id:albumId},{$set:{imagePath:imageName}}).then((n)=>{
            if(n){return res.status(200).send("Album Image changed successfully");}
    }).catch((e)=>{
        return res.status(500).send("Could not change Album Cover Image");
    });
}

exports.AuthenticateUser =AuthenticateUser=async(req,res,uploadImagefn)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(user){
            userId=user._id.toString();
            type="user";
            uploadImagefn();

        }
        if(!user){
            return res.status(401).send('Unauthorized Access');
        }
    }).catch((e)=>{
        return res.status(401).send('Unauthorized Access');
    });
};


exports.AuthenticateArtist =AuthenticateArtist=async(req,res,uploadImagefn)=>{
    var token = req.header('x-auth');
    artist.findByToken(token).then((myArtist)=>{
        if(myArtist){
            userId=myArtist._id.toString();
            type="artist";
            uploadImagefn();

        }
        if(!myArtist){
            return res.status(401).send('Unauthorized Access');
        }
    }).catch((e)=>{
        return res.status(401).send('Unauthorized Access');
    });
};

exports.AuthenticateArtistTrack =AuthenticateArtistTrack=async(req,res,uploadImagefn)=>{
    var token = req.header('x-auth');
    var trackName = req.header('trackName');
    if(!trackName){
        return res.status(400).send("Missing track Name");
    }
    artist.findByToken(token).then((myArtist)=>{
        if(myArtist){
            userId=myArtist._id.toString();
            type="track";
            trackName2= trackName;
            track.findOne({$and:[{artistId:userId},{trackName:trackName2}]}).then((present)=>{
                if(!present){
                    return res.status(404).send("Track is not found");
                }
            });
            uploadImagefn();

        }
        if(!myArtist){
            return res.status(401).send('Unauthorized Access');
        }
    }).catch((e)=>{
        return res.status(401).send('Unauthorized Access');
    });
};

exports.AuthenticateArtistAlbum =AuthenticateArtistAlbum=async(req,res,uploadImagefn)=>{
    var token = req.header('x-auth');
    albumId= req.header('albumId');
    if(!albumId){
        return res.status(400).send("Missing Album Id");
    }
    if(!ObjectID.isValid(albumId)){return res.status(404).send("Invalid Album ID");}
    artist.findByToken(token).then((myArtist)=>{
        if(myArtist){
            type="album";
            userId=myArtist._id.toString();
            album.findById({_id:albumId}).then((present)=>{
                if(!present){
                    return res.status(404).send('Album is not found.May be removed by the artist');
                }
            });
            uploadImagefn();

        }
        if(!myArtist){
            return res.status(401).send('Unauthorized Access');
        }
    }).catch((e)=>{
        return res.status(401).send('Unauthorized Access');
    });
};


////
const app = express();
app.use(bodyParser.json());

