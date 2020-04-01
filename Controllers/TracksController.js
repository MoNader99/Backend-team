const express=require('express');
//const bodyParser=require('body-parser');
const _=require ('lodash');
const { mongoose } = require("./../db/mongoose.js");
const{track}=require("./../models/track");


const{playlist}=require("./../models/playlists");
const{album}=require('./../models/album');
//const{artist}=require('./../models/artists');
var { User } = require("./../models/users.js");
var{images}= require("./../models/images.js"); // images model
var{artist}= require("./../models/artists.js"); 

const {ObjectID}=require('mongodb');

const router=express.Router();


//app.listen(3000,()=>{console.log('started on port 3000');});
//app.use(bodyParser.json());


/** GetATrack
* ---------------------
* 
* @api {Get} api/Tracks/:id               Get a Track
* @apiName GetTrack
* @apiGroup Tracks
*
* 
* @apiParam {string}    id           the id of the track that the artist wants to delete 
* 
* @apiSuccess {object}               object of type track in JSON formatwith status code 200
*
* @apiSuccessExample {JSON} Success-Response:
*     HTTP/1.1 200 OK
*      {
*          ""tracks": {
        "rating": 10,
        "duration": 360000,
        "_id": "5e6b7dac91cb724878446635",
        "trackName": "Hello",
        "url": "cccc",
        "__v": 0
    }
*      }
* 
*    
* 
* @apiError  404                      [Track not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "message": "Track not found"
*     }
* 
* @apiError  404                    [Track not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 
*     {
*       "message": "invalid id"
*     }
*
*
*
* 
*/
router.get('/tracks/:id', (req,res)=>{
var id=req.params.id;
if(!ObjectID.isValid(id))
{
    return res.status(404).json({"message":"invalid id"});
}

 track.findById(id).then((tracks)=>{
    if(!tracks){return res.status(404).json({"message":"Track not found"});}
    res.send({tracks})

}).catch((e)=>res.status(400).send());

})


/**
* AddTracksToAPlaylist
 * ---------------------
 * 
 * @api {post} api/Playlists/:playlistId/Tracks               Add tracks to a playlist
 * @apiName AddTracksToAPlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string}  x-auth     
 *  
 *@apiParam {string}  playlistId
 * 
 * @apiParam {string[]}   url            a list of Urls to be passed in the body parameters
 * @apiSuccess 200                      [tracks has been successfully added to playlist]
 *   @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      
 *       "message": "tracks added successfully"
 *     }
 * 
 * 
 * *@apiError  403                      [Forbidden because you crossed the limiting number of tracks in a playlist which is 1000]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *        "message":  "Forbidden because you crossed the limiting number of tracks in a playlist which is 1000"
 *     }
 * 
 * @apiError 401   [authentication failed]
 *@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 401 
 *     {
 *        "message":  "authentication failed"
 *     }
 * 
 * 
 * 
 * 
 * @apiError 404     [playlist not found]
*@apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 
 *     {
 *        "message":  "playlist not found"
 *     }
 * 
 * 
 */

router.post('/tracks/:playlistId/playlists',async (req,res)=>
{
    var flagg=0
    var userId;
     var token = req.header('x-auth');

var url= req.body.url;
//console.log(url);


var tracksarr=[{}];
if(url.length>10)
{
    res.status(403).json({"message":" Forbidden because you crossed the limit of tracks in a playlist which is 10"});
}
var flag=0;
for(var i=0;i<url.length;i++)   //there is a problem when invalid urls are given   ( Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters)
{
    
    await track.find({url: url[i]}).then((tracks)=>
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
 

}).catch((e)=>{ return })//res.status(400).send(e)});

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





/** 
 * GetSeveralTracks
 * ---------------------
 * 
 * @api {Get} api/Tracks               Get several Track
 * @apiName GetSeveralTracks
 * @apiGroup Tracks
 *
 * 
 * @apiParam {string[]}    id          An array of comma separated tracks Ids. Maximum 50 IDs. 
 * 
 * @apiSuccess {object[]}     200          a set objects of type tracks in JSON format with status code 200
 *
 * * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
[
    {
        "rating": 8,
        "_id": "5e74925ca9200c404c566eff",
        "artistId": "5e74925ca9200c404c566ef5",
        "trackName": "set fire to the rain",
        "duration": 240000,
        "image": {
            "_id": "5e74925ca9200c404c566ef2",
            "url": "www.images/imag23e/23454",
            "height": 176,
            "width": 65
        },
        "url": "nnnn",
        "__v": 0
    },
    {
        "rating": 9,
        "_id": "5e74925ca9200c404c566f03",
        "artistId": "5e74925ca9200c404c566ef7",
        "trackName": "Godzilla",
        "duration": 223000,
        "image": {
            "_id": "5e74925ca9200c404c566ef2",
            "url": "www.images/imag23e/23454",
            "height": 176,
            "width": 65
        },
        "url": "vvv",
        "__v": 0
    }
]
 *
 * 
 * *@apiError  404                      [Track not found]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *      "message": "can not find track"
 *     }
 * 
 * @apiError  404                      [invalid id]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message" : "invalid id"
 *     }
 *
 *  @apiError  403                      
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 forbidden
 *     {
 *       "message" : "max 50 Ids"
 *     }
 *  
 * 
 * 
 */

router.get('/tracks',async (req,res)=>{
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

    await track.findById(req.body.id[i]).then((tracks)=>
    {
       if(!tracks){return res.status(404).json({"message":"can not find track"});}
        returnedTrackArray[i]=tracks;
    }).catch((e)=>res.status(400).send(e));


    }
res.send(returnedTrackArray);
    })





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




//ADD A TRACK
router.post('/tracks',(req,res)=>{
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
                        res.status(500).send("Coult not add Track ("+req.body.trackName+")");
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


    

    // Add a track
//     app.post('/tracks',async (req,res)=>
// {
//         var token = req.header('x-auth');
//          artist.findByToken(token).then((artist) => {
//          if(!artist){
//              console.log("you are not authorized to add a track")
//              return Promise.reject();
//          }
//          console.log("you are authorized to add a track");
        
//          var newTrack = new track(
//          {
//              artistId : artist._id,
//              trackName : req.body.trackName,
//              duration : req.body.duration,
//              url : req.body.url
//          })
//          console.log('Recieved info successfully');
//             newTrack.save().then((res)=>{
//                 console.log(res._id);
//                 console.log('saved')
//             },(err)=>{
//                 console.log(err);
//                 res.status(500).send('Insertion of new track has failed');
//             }
//             ).catch((e) => {
//                 console.log(e);
//                 return Promise.reject();
//             })
//         }).catch((e)=>{
//             console.log(e);
//             return Promise.reject();
//            });
           
//            res.status(200).send('Inserted succesfully');
//         });

///////// Like a track ///////////
router.post('/tracks/like/:id', (req,res) =>
{
    var trackId = req.params.id;
    var token = req.header('x-auth');
    if(!token)
    {
        res.status(401).send('Token is Empty');
    }
    if(!ObjectID.isValid(trackId))
    {
        return res.status(404).send("Invalid id");
    }
    track.findOne({_id:trackId}).then((track) => {
    if(!track){
        res.status(404).send('No track found');
    }
    })
    User.findByToken(token).then((user) =>{
        if(!user)
        {
            res.status(401).send('Token Invalid');
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
        res.status(400).send('You should Pass a token to access your liked tracks');
    }
    User.findByToken(token).then((user) =>
    {
        if(!user)
        {
            res.status(401).send('you are not a user or your token is expired');
        }
        res.status(302).send(user.likedTracks);
    }).catch((e) =>
    {
        res.status(500).send('invalid token');
    })
})

module.exports=router;