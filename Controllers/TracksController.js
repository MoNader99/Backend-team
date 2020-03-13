const express=require('express');
const bodyParser=require('body-parser');
var { mongoose } = require("./../db/mongoose.js");
const{track}=require("./../models/track");
const{playlistTracks}=require("./../models/playlistTracks");

const {ObjectID}=require('mongodb');

const app=express();


app.listen(3000,()=>{console.log('started on port 3000');});


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



