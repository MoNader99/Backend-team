const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{track}= require("../models/track.js");
var{User}= require("../models/users.js");

// beforeEach((done)=>{
//   var testTrack=new Track(
//         {
//             "artistId": "5ebdb176b4751d4be056a290",
//             "trackName": "testTrack",
//             "genre": "testGenre",
//             "trackPath": "Hello-Adele-seeds.mp3",
//             "type": "Single"
//         });
//
//   Track.save().then(()=> done());
// })

describe('GET /tracks/:genre', () => {

  it('should get tracks with the passed genre ', (done) =>
  {
    User.find().then((users)=>
    {
      users[users.length-1].generateAuthToken().then((token)=>
      {
        track.find().then((tracks)=>
        {
          console.log(  tracks[tracks.length-1].genre);
            request(app)
            .get(`/tracks/`+ tracks[tracks.length-1].genre)
            .set('x-auth',token)
            .expect(200)
            .end(done)
        })
    })
   })
 });

 it('should refuse empty token ', (done) =>
 {

       track.find().then((tracks)=>
       {
         console.log(  tracks[tracks.length-1].genre);
           request(app)
           .get(`/tracks/`+ tracks[tracks.length-1].genre)
           .expect(403)
           .end(done)
       })
   });


})
