const express=require('express');
const _=require ('lodash');
const { mongoose } = require("./../db/mongoose.js");
const{track}=require("./../models/track");
var bodyParser= require('body-parser');
const multer = require("multer");
const{playlist}=require("./../models/playlists");
const fs=require('fs');
const{album}=require('./../models/album');
var { User } = require("./../models/users.js");
var{artist}= require("./../models/artists.js"); 
var upload=require("./../Services/uploadTrack").uploadTrack;
var{notification}=require("./../models/notifications.js");
const {ObjectID}=require('mongodb');
//edit image imports
var uploadImagefn=require("./../Services/ImageService.js").upLoadPhoto;
var upload2=require("./../Services/ImageService.js").UploadUserPhoto;
var AuthenticateArtistTrack= require("./../Services/ImageService.js").AuthenticateArtistTrack;
var AssignTrackImage=require("./../Services/ImageService.js").AssignTrackImage;
////////////////////////
const router=express.Router();
///////////////////////

//EDIT TRACK COVER IMAGE
router.post("/tracks/coverimage",AuthenticateArtistTrack,upload2,reSizeUserImage,uploadImagefn,AssignTrackImage);




//ADD A SINGLE TRACK
router.post('/tracks/single',upload,(req,res)=>{
    var token = req.header('x-auth');
    artist.findByToken(token).then((myartist)=>{
    var atristId2= myartist._id; 
    var artistName=myartist.artistName;
    if(!req.body.trackName){
        return res.status(400).send("Missing trackName");
    }
    if(!req.body.genre){
        return res.status(400).send("Missing genre");
    }
    if(!req.file){  // no file is sent
        return res.status(400).send('Please upload a track');
    }
    if(req.fileError){    // the upladed file is not a track
        return res.status(400).send('Please upload a track');
    }
    track.find({$and:[{artistId:atristId2},{trackName:req.body.trackName }]}).then((trackduplicate)=>{
            if(trackduplicate.length!=0){  //409 is code for conflict
                return res.status(409).send("Cannot create 2 Tracks with the same name ("+req.body.trackName+") for the same artist");
            };
            var not2 = new notification({
                text:artistName+" released a new Song ("+req.body.trackName +")",
                sourceId:atristId2,
                userType:"artist"
                
            });
            not2.save();
            var trackInstance = new track({
                artistId: atristId2,
                trackName: req.body.trackName,
                genre:req.body.genre,
                trackPath:req.body.trackName+"--"+atristId2+"."+"mp3"

            },(e)=>{
                res.status(500).send("Coult not add Track ("+req.body.trackName+")");
            });
            trackInstance.save().then((doc)=>{
                res.status(201).send(doc);  
            }).catch((e)=>{
                res.status(500).send("Coult not add Track ("+req.body.trackName+")");
            });
        });

}).catch((e)=>{
    res.status(401).send('Unauthorized Access');
})
});

//////////////////////////////////////
//STREAM A TRACK
router.get('/tracks/stream',(req,res)=>{
    var token = req.header('x-auth'); 
    User.findByToken(token).then((user)=>{
        if(!user){return Promise.reject();}
        var trackId = req.header('trackId'); 
        if(!trackId){
            return res.status(400).send("Missing track ID");
        }
        if(!ObjectID.isValid(trackId)){return res.status(404).send("Invalid track ID");}
        track.findByIdAndUpdate({_id:trackId}).then((streamedTrack)=>{
            if(!streamedTrack){return res.status(404).send("Track not found. Maybe deleted by the artist");}
            // if there is a track document but no track file
            if(!streamedTrack.trackPath){return res.status(404).send("Cannot play track")}
            //
            var path = './tracks/'+streamedTrack.trackPath;
            const stat= fs.statSync(path);   //returns inofrmation about a given file asynchronouslly
            const fileSize= stat.size;  
            var range = req.headers.range;  //the requested number of bytes 0-50 (from 0 to 50) -> sent intially empty 0 only
            if(range){
                const parts=range.replace(/bytes=/,"").split("-");
                var start= parseInt(parts[0],10);
                var end; 
                if(start+7000<fileSize){  //7000 bytes per send
                    end=start+7000;
                }
                else{
                    end=fileSize-1;
                }
                const chunckSize= (end-start)+1;
                const stream = fs.createReadStream(path,{start,end});
                const head={
                    "Content-Range":`bytes ${start}-${end}/${fileSize}` ,
                    "Accept-Ranges": "bytes",
                    "Content-Length":chunckSize,
                    "Content-Type":"audio/mp3"
                };
                res.writeHead(206,head)
                stream.pipe(res);
                
            }
            else{
                const head= {
                    "Content-Length" : fileSize,
                    "Content-Type": "audio/mp3",
                };

                res.writeHead(200,head);
                track.findByIdAndUpdate({_id:trackId},{$inc:{numberOfTimesPlayed:1}}).then((res)=>{});
                fs.createReadStream(path).pipe(res);
            }

        });
    }).catch((e)=>{res.status(401).send('Unauthorized Access');})
});











//ADD TRACKS TO PLAYLIST
////
router.post('/tracks/:playlistId/playlists',async (req,res)=>
{
    var flagg=0
    var userId;
     var token = req.header('x-auth');

var url= req.body.trackId;  //will change it tracks id but will leave variable name as it is
//var url=req.body.url
//console.log(url);


var tracksarr=[{}];
if(url.length>10)
{
    res.status(403).json({"message":" Forbidden because you crossed the limit of tracks in a playlist which is 10"});
}
var flag=0;
for(var i=0;i<url.length;i++)   //there is a problem when invalid urls are given   ( Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters)
{
    
   
if(!ObjectID.isValid(url[i]))  //validate the playlist id
{
return res.status(404).json({"message":"the track was not found"});
}




   
   await track.find({_id: url[i]}).then((tracks)=>
  //await track.findById(ObjectID(url[i])).then((tracks)=>
{
    //console.log("gowaaaaaaalllllllllllllll")
    //console.log("el tracks ely rag3a");
   // console.log(JSON.stringify( tracks))
    if(!tracks[0]) 
   { 
       flag=1;
      // console.log("gowaaaaaaa")
    //return res.status(404).json({"message":"the track was not found"});
    return Promise.reject();
   }
     tracksarr[i]=tracks;
 

}).catch((e)=>{return})//res.status(400).send(e)});

if(flag) {
    //console.log(flag);
    break}
}



if (flag) {return res.status(404).json({"message":"the track was not found"});}

//console.log("heloo");


var id=req.params.playlistId;
//console.log(id);

if(!ObjectID.isValid(id))  //validate the playlist id
{
return res.status(404).json({"message":"invalid id"});
}

playlist.findById(id).then(async (playlists)=>{

if(!playlists) {return res.status(404).send({"message":"playlist not found"})};
//console.log(userId);
//console.log(playlist);

//console.log('wohooooooo')


await User.findByToken(token).then((user) => {
    if(!user){
        return Promise.reject();
    }

  userId=user._id;


}).catch((e)=>{
   flagg=1

   return res.status(401).json({"message":"authentication failed"})})

if(flagg)
{
   return;
}



if(! (playlists.userId.toString()=== userId.toString()))  {return res.status(401).json({"message":"auth failed"});}

// console.log(playlist)
for(var i=0;i<tracksarr.length;i++)
{
var trackId= _.map(tracksarr[i],"_id");



 var len =playlists.tracks.length;
 playlists.tracks[len]=ObjectID(trackId.toString())
 
 playlists.markModified('tracks')
 playlists.save();


}
//console.log(JSON.stringify(playlists));
//playlists.markModified('tracks')
//playlists.save();
console.log("end")

return res.status(200).json({"message":'tracks added successfully'});
})






 })




//GET SEVERAL TRACKS
///////
/*router.post('/tracks',async (req,res)=>{
    var arr=req.body.id;
  
    var returnedTrackArray=[{}];

    if(arr.length>50)
    {
       return res.status(403).json({"message":" Forbidden maximum 50 Ids"});
    }
    



    for(var i=0;i<arr.length;i++)
    {
    if(!ObjectID.isValid(arr[i]))
    {
        return res.status(404).json({"message":"invalid id"});
    }

    var flag=0
    await track.findById(req.body.id[i]).then((tracks)=>
    {
       if(!tracks) {flag=1;
           return res.status(404).json({"message":"can not find track"});}
        returnedTrackArray[i]=tracks;
    }).catch((e)=>res.status(400).send(e));
    if(flag)
    {
        break;
    }

    }
    if (flag)
    {
        return 
    }
 
res.send({"tracks":returnedTrackArray});    //need to send an object with a name "tracks":returnedTrackArray
    })*/





//DELETE A TRACK
router.delete('/tracks',(req,res)=>{
    var token = req.header('x-auth');
    artist.findByToken(token).then((myartist)=>{
        if(!myartist){
            return Promise.reject();
        }
    var atristId2= myartist._id; 
    if(!req.body.trackName){
        return res.status(400).send("Pass the track name to delete");
    }  
    var trackName1=req.body.trackName ;  //track name
    

    track.findOneAndRemove({$and:[{artistId: atristId2},{trackName:trackName1 }]}).then((delTracks)=>{
        if(!delTracks){
            
            return res.status(404).send('Track not found to be deleted');
        }
        
        res.status(200).send("Track "+trackName1+" was deleted succsesfully");

    }).catch((e)=>{
        res.status(500).send("Could not delete track");
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});



///////// Like a track ///////////
router.post('/tracks/like/:id', (req,res) =>
{
    var trackId = req.params.id;
    var token = req.header('x-auth');
    if(!token)
    {
        return res.status(401).send('Token is Empty');
    }
    if(!ObjectID.isValid(trackId))
    {
        return res.status(404).send("Invalid id");
    }
    track.findOne({_id:trackId}).then((track) => {
    if(!track){
        return res.status(404).send('No track found');
    }
    })
    User.findByToken(token).then((user) =>{
        if(!user)
        {
            return res.status(401).send('User does not have access or does not exist');
        }
        console.log('user was found');
        var len =user.likedTracks.length;
        if(len == 0)
        {
            user.likedTracks[0]=ObjectID(trackId.toString());
            user.markModified('likedTracks')
            user.save();
            track.findOne({_id:trackId}).then((track) => {
                track.likes = track.likes +1;
                track.markModified('likes');
                track.save();
                })
            res.status(200).send();
        }
        else{
        for(var i = 0;i<len;i++)
        {
            if(trackId==user.likedTracks[i])
            {
                return res.status(403).send('You have already liked that track');   
            }
        }
        user.likedTracks[len]=ObjectID(trackId.toString());
        user.markModified('likedTracks')
        user.save();
        track.findOne({_id:trackId}).then((track) => {
            track.likes = track.likes +1;
            track.markModified('likes');
            track.save();
            })
        res.status(200).send();
        }
    }) 
})


/////// Get Liked Tracks //////////
router.get('/tracks/like/me', (req,res) =>
{
    var token = req.header('x-auth');
    if(!token)
    {
        res.status(401).send('Token is Empty');
    }
    User.findByToken(token).then((user) =>
    {
        if(!user)
        {
            res.status(401).send('User does not have access or does not exist');
        }
        res.status(302).send(user.likedTracks);
    }).catch((e) =>
    {
        res.status(401).send('User does not have access or does not exist');
    })
})

module.exports=router;