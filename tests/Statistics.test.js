const request = require('supertest')
//local imports
const app=require('./../Index');
var{track}= require("../models/track.js");
var{album}= require("../models/album.js");
var{User}= require("../models/users.js");



describe('GET /tracks/statistics/:id', () => {

  it('should get statistics for the track ', (done) =>
  {
    User.find().then((users)=>
    {
      users[users.length-1].generateAuthToken().then((token)=>
      {
        track.find().then((tracks)=>
        {
            request(app)
            .get(`/tracks/statistics/`+ tracks[tracks.length-1]._id)
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
           .get(`/tracks/statistics/`+ tracks[tracks.length-1]._id)
           .expect(403)
           .end(done)
       })
   });

   it('should refuse invalid token ', (done) =>
   {

         track.find().then((tracks)=>
         {
             request(app)
             .get(`/tracks/statistics/`+ tracks[tracks.length-1]._id)
             .set('x-auth',"invalid token")
             .expect(401)
             .end(done)
         })
     });

     it('should reject invalid ID ', (done) =>
     {

       User.find().then((users)=>
       {
         users[users.length-1].generateAuthToken().then((token)=>
         {
               request(app)
               .get('/tracks/statistics/invalid')
               .set('x-auth',token)
               .expect(400)
               .end(done)
       })
      })
    });
    it("should return not found if the track doesn't exist ", (done) =>
    {

      User.find().then((users)=>
      {
        users[users.length-1].generateAuthToken().then((token)=>
        {
              request(app)
              .get('/tracks/statistics/5ec1c6309760c939c8b33a99')
              .set('x-auth',token)
              .expect(404)
              .end(done)
      })
     })
   });

})

/*describe('GET /tracks/allgenres', () => {

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

}*/
