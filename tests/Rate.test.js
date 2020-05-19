const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{track}= require("../models/track.js");
var{User}= require("../models/users.js");

beforeEach((done)=>{
  var testTrack=new track(
        {
            "artistId": "5ebdb176b4751d4be056a290",
            "trackName": "testTrack",
            "genre": "testGenre",
            "trackPath": "Hello-Adele-seeds.mp3",
            "type": "Single"
        });

  testTrack.save().then(()=> done());
})


describe('POST /tracks/rate/:id/:value', () => {

  it('should rate the track for the first time', (done) =>
  {
    User.find().then((users)=>
    {
      users[users.length-1].generateAuthToken().then((token)=>
      {
        track.findOne({trackName: "testTrack",}).then((testTrack)=>
        {
            request(app)
            .post(`/tracks/rate/`+ testTrack._id+'/5')
            .set('x-auth',token)
            .expect(200)
            .end(done)
        })
    })
   })
 });

//  it('should refuse empty token ', (done) =>
//  {
//
//        track.find().then((tracks)=>
//        {
//            request(app)
//            .get(`/tracks/`+ tracks[tracks.length-1].genre)
//            .expect(403)
//            .end(done)
//        })
//    });
//
//    it('should refuse invalid token ', (done) =>
//    {
//
//          track.find().then((tracks)=>
//          {
//              request(app)
//              .get(`/tracks/`+ tracks[tracks.length-1].genre)
//              .set('x-auth',"invalid token")
//              .expect(401)
//              .end(done)
//          })
//      });
//
//      it('should return not found if the genre has no tracks ', (done) =>
//      {
//
//        User.find().then((users)=>
//        {
//          users[users.length-1].generateAuthToken().then((token)=>
//          {
//                request(app)
//                .get(`/tracks/invalid`)
//                .set('x-auth',token)
//                .expect(404)
//                .end(done)
//        })
//       })
//     });
//
 })
