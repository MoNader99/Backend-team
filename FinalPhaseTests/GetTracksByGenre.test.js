const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{track}= require("../models/track.js");
var{User}= require("../models/users.js");


describe('GET /tracks get tracks by genre', () => {

  it('should get tracks with the passed genre ', (done) =>
  {
    User.find().then((users)=>
    {
      users[users.length-1].generateAuthToken().then((token)=>
      {
        track.find().then((tracks)=>
        {

            request(app)
            .get(`/tracks/?genre=`+ tracks[tracks.length-1].genre)
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
           request(app)
           .get(`/tracks/?genre=`+ tracks[tracks.length-1].genre)
           .expect(403)
           .end(done)
       })
   });

   it('should refuse invalid token ', (done) =>
   {

         track.find().then((tracks)=>
         {
             request(app)
             .get(`/tracks/?genre=`+ tracks[tracks.length-1].genre)
             .set('x-auth',"invalid token")
             .expect(401)
             .end(done)
         })
     });

     it('should return not found if the genre has no tracks ', (done) =>
     {

       User.find().then((users)=>
       {
         users[users.length-1].generateAuthToken().then((token)=>
         {
               request(app)
               .get(`/tracks/?genre=invalid`)
               .set('x-auth',token)
               .expect(404)
               .end(done)
       })
      })
    });

})


describe('GET /tracks/allgenres', () => {

  it('should get all available genres ', (done) =>
  {
    User.find().then((users)=>
    {
      users[users.length-1].generateAuthToken().then((token)=>
      {
            request(app)
            .get('/tracks/allgenres')
            .set('x-auth',token)
            .expect(200)
            .end(done)
    })
   })
 });

 it('should refuse empty token ', (done) =>
 {

       track.find().then((tracks)=>
       {
           request(app)
           .get('/tracks/allgenres')
           .expect(403)
           .end(done)
       })
   });

   it('should refuse invalid token ', (done) =>
   {

             request(app)
             .get('/tracks/allgenres')
             .set('x-auth',"invalid token")
             .expect(401)
             .end(done)
     });


})
