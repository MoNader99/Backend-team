const express=require('express');
const bodyParser=require('body-parser');
const { mongoose } = require("./../db/mongoose.js");
const{track}=require("./../models/track");
const{playlistTracks}=require("./../models/playlistTracks");
const{album}=require('./../models/album');
const{artist}=require('./../models/artists')

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
 * @apiHeader {string} Authorization    Only an Artist can upload a track
 * @apiHeader {JSON}   Content-Type     The content of the request body in JSON format. 
 *  
 *
 * 
 * @apiParam {[string]}   uri     a list of Uris to be passed in the body parameters
 * @apiSuccess 200                      [tracks has been successfully added to playlist]
 * 
 * 
 * *@apiError  403                      [Forbidden because you crossed the limiting number of tracks in a playlist which is 10000]
 *  @apiErrorExample {JSON} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Forbidden because you crossed the limiting number of tracks in a playlist which is 10000"
 *     }
 * 
 * 
 */

// app.post('/Playlists/:playlistId/tracks',async (req,res)=>
// {
 
//     var url=req.body.url;
//     console.log(url);

//     var id=req.params.playlistId;
//     var tracksarr=[];
    
//     for(var i=0;i<url.length;i++)
//     {
        
//         await track.find({url: url[i]}).then((tracks)=>
//     {
//        if(!tracks) {return res.status(404).send('the track was not found');}
//         tracksarr[i]=tracks;
//         //console.log(tracksarr[i]);
//     }).catch((e)=>res.status(400).send(e));


// }

// setTimeout(()=>console.log(tracksarr),1000);
    
// if(!ObjectID.isValid(id))  //validate the playlist id
// {
//     return res.status(404).send("invalid id");
// }


// playlistTracks.find({playlistId:id}).then((playlisttracks)=>{


//     if(!playlisttracks) {return res.status(404).send("can not find playlist");} // handle the case where it is a created playlist which is not in the collection of playlisttracks}
//    // res.send(playlisttracks);
//    console.log(JSON.stringify( playlisttracks))
   
// //    track.find({url:url1}).then((tracks)=>{
     
// //     console.log(tracks);
// //     console.log(tracks[0]._id);
// //     console.log(tracks[0].trackName);
   
//      var newTrack=JSON.stringify( tracksarr[0]);
    
     
//      setTimeout(()=>{console.log(newTrack)},2000);

// // for(var i=0;i<tracksarr.length;i++)
// // {
// //     setTimeout(()=>{ playlisttracks[0].tracks.push(tracksarr[i]._id)},2000);
     
// // }
// // console.log("testinggg");
// // console.log(playlisttracks[0].tracks);

//     //  playlistTracks.findByIdAndUpdate((id),{$set:{tracks:playlisttracks.tracks}},{new:true}).then((neww)=>
//     // {
//     //     //console.log(neww);
//     //     //res.send(neww);
//     //  })
    
//    })



//      //if(!tracks){return res.status(404).send("can not find track")}

//    //playlisttracks.update({$push:{"tracks":tracks }}).then((trackkk)=>{res.send(trackkk)});

//    })
// //}).catch((e)=>{res.status(400).send("could not add track");
// //console.log(e)});

// //})





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
    