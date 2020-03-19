const express=require('express');
const bodyParser=require('body-parser');
const _=require ('lodash');
const { mongoose } = require("./../db/mongoose.js");
const{track}=require("./../models/track");
//const{playlistTracks}=require("./../models/playlistTracks");

const{playlist}=require("./../models/playlists");
const{album}=require('./../models/album');
const{artist}=require('./../models/artists');
var { User } = require("./../models/users.js");
var{images}= require("./../models/images.js"); // images model


const {ObjectID}=require('mongodb');

const app=express();


app.listen(3000,()=>{console.log('started on port 3000');});
app.use(bodyParser.json());


// album.find({albumName:'25'}).then((album)=>{

//     trackId=album[0].tracks[0]._id;
  
//     console.log(trackId);
//  track.findById(trackId).then((track)=>{
//      console.log(track);
//  })
// //setTimeout(() =>{console.log(album.tracks)},3000);

//     console.log(album);
// })










/** GetATrack
* ---------------------
* 
* @api {Get} api/Tracks/:id               Get a Track
* @apiName GetTrack
* @apiGroup Tracks
*
* @apiHeader {string} Authorization    Required. Avalid acces token from our Accounts services
* 
* @apiParam {string}    trackId           the id of the track that the artist wants to delete 
* 
* @apiSuccess {object[]}               object of type track in JSON formatwith status code 200
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
* *@apiError  404                      [Track not found]
*  @apiErrorExample {JSON} Error-Response:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "Track not found"
*     }
* 
* 
*/
app.get('/tracks/:id', (req,res)=>{
var id=req.params.id;
if(!ObjectID.isValid(id))
{
    return res.status(404).send("invalid id");
}

 track.findById(id).then((tracks)=>{
    if(!tracks){return res.status(404).send("can not find track");}
    res.send({tracks})

}).catch((e)=>res.status(400).send());

})


/**
* AddTracksToAPlaylist
 * ---------------------
 * 
 * @api {post} api/Playlists/{playlistId}/Tracks               Add tracks to a playlist
 * @apiName AddTracksToAPlaylist
 * @apiGroup Playlists
 *
 * @apiHeader {string}  x-auth    
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format. 
 *  
 *
 * 
 * @apiParam {[string]}   url    a list of Urls to be passed in the body parameters
 * @apiSuccess 200                      [tracks has been successfully added to playlist]
 * 
 * 
 * *@apiError  403                      [Forbidden because you crossed the limiting number of tracks in a playlist which is 1000]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "Forbidden because you crossed the limiting number of tracks in a playlist which is 1000"
 *     }
 * @apiError 401   [authentication failed]
 * @apiError 404  [playlist not found]
 */

app.post('/Playlists/:playlistId/tracks',async (req,res)=>
{
        var userId;
         var token = req.header('x-auth');
         User.findByToken(token).then((user) => {
         if(!user){
             return Promise.reject();
         }

       userId=user._id;


    }).catch((e)=>{return res.status(401).send("auth failed")}) 
    var flag=0;
    var url= req.body.url;
    console.log(url);

    var id=req.params.playlistId;
    var tracksarr=[{}];
    if(url.length>1000)
    {
        res.status(403).send(" Forbidden because you crossed the limiting number of tracks in a playlist which is 1000");
    }
    
 for(var i=0;i<url.length;i++)   //there is a problem when invalid urls are given   ( Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters)
    {
        console.log(` loop ${i} flag ${flag} `)
        await track.find({url: url[i]}).then((tracks)=>
    {
        
    //     if(!tracks) 
    //    { 
    //        flag=1;
    //     return res.status(404).end("the track was not found");
    //    }
    //      tracksarr[i]=tracks;
    //     console.log(tracksarr[i]);
     
        if(tracks)
        {
            tracksarr[i]=tracks;
        console.log(tracksarr[i]);
            
        }
        else{
            flag=1;
            
           return Promise.reject("the track was not found");
        //return res.status(404).end("the track was not found");
        }

     


    }).catch((e)=>res.status(400).send(e));


    //  if(flag)
    //  {return res.status(404).end("the track was not found");}
         //flag=0;
    //     return res.status(404).send('the track was not found');
    // }
    

    // console.log(`loop after ${i} flag ${flag} `)
}



console.log(tracksarr);

    
if(!ObjectID.isValid(id))  //validate the playlist id
{
    return res.status(404).send("invalid id");
}

playlist.findById(id).then((playlist)=>{

    if(!playlist) {return res.status(404).send("playlist not found")};
    console.log(userId);
    console.log(playlist);
    //console.log({playlist:userId});

if(! (playlist.userId.toString()=== userId.toString()))  {return res.status(401).send("auth failed");}

    console.log(playlist)
for(var i=0;i<tracksarr.length;i++)
{
    var trackId= _.map(tracksarr[i],"_id");
   
    playlist.tracks.push(ObjectID(trackId.toString()));

}
   console.log(playlist);
   playlist.save();
   res.send('tracks added successfully');
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
 * @apiHeader {string} Authorization    Required. Avalid acces token from our Accounts services
 * 
 * @apiParam {string}    trackIds          An array of comma separated tracks Ids. Maximum 50 IDs. 
 * 
 * @apiSuccess {object[]}     200          a set objects of type tracks in JSON format with status code 200
 *
 * * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
    {
        "rating": 9,
        "duration": 285000,
        "_id": "5e6cbab4aa45bb3bacd5b916",
        "trackName": "someone like you",
        "url": "nnnn",
        "__v": 0
    },
    {
        "rating": 9,
        "duration": 223000,
        "_id": "5e6cbab4aa45bb3bacd5b919",
        "trackName": "Never Give Up",
        "url": "vvv",
        "__v": 0
    },
    {
        "rating": 10,
        "duration": 262000,
        "_id": "5e6cbab4aa45bb3bacd5b918",
        "trackName": "cheap thrills",
        "url": "lll",
        "__v": 0
    }
 *
 * 
 * *@apiError  404                      [Track not found]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       can not find track
 *     }
 * 
 * *@apiError  404                      [invalid id]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       invalid id
 *     }
 * 
 * 
 * 
 */

app.get('/tracks',async (req,res)=>{
    var arr=req.body.id;
  
    var returnedTrackArray=[{}];
    for(var i=0;i<arr.length;i++)
    {
    if(!ObjectID.isValid(arr[i]))
    {
        return res.status(404).send("invalid id");
    }

    await track.findById(req.body.id[i]).then((tracks)=>
    {
       if(!tracks){return res.status(404).send("can not find track");}
        returnedTrackArray[i]=tracks;
    }).catch((e)=>res.status(400).send(e));


    }
res.send(returnedTrackArray);
    })





//DELETE A TRACK
app.delete('/tracks',(req,res)=>{
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
        res.status(400).send();
    })
    }).catch((e)=>{
        res.status(401).send('Unauthorized Access');
    })
});


//ADD A TRACK
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
        if(!req.body.image){
           return  res.status(400).send("Track image is required");
        }
        if(!req.body.url){
            return res.status(400).send("Track url is required");
        }
        if(!req.body.duration){
            return res.status(400).send("Track duration is required");
        }

        track.findOne({url:req.body.url}).then((duptrackurl)=>{
            if(duptrackurl){
                return res.status(400).send("This track is already created");
                
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
    
                    },(e)=>{
                        res.status(401).send("Coult not add Track ("+req.body.trackName+")");
                    });
                
                    trackInstance.save().then((doc)=>{
                        res.send(doc._id);  // you can send back the whole document or just the id of the created playlist
                    }).catch((e)=>{
                        res.status(401).send("Coult not add Track ("+req.body.trackName+")");
                    });
                    
                }
                else if(trackduplicate.length!=0){
                    return res.status(400).send("Cannot create 2 Tracks with the same name ("+req.body.trackName+") for the same artist");
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