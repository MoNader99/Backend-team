const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');
const app=require('./../Index');
//const{app}=require("./../Controllers/TracksController")
//const {track}=require("./../Controllers/TracksController"); //tracks model
const {track}=require("./../models/track");
var{User}= require("../models/users.js");
console.log('mmmmmmmm')


// describe('Get /tracks/:id',()=>{


// it('should return a track with the given id',(done)=>{

//      track.find().then((tracks)=>{
//         var id= tracks[0]._id.toHexString();
        
//         var test=JSON.stringify( tracks[0])
//         request(app)
//         .get(`/tracks/${id}`)
//         .expect(200)
//         .expect((res)=>{
//            expect(JSON.stringify( res.body.tracks)).toEqual(test)  
//         })
//         .end(done)
//          })

//     })


// it ('should return 404 if track was not found',(done)=>{

//      request(app)
//      .get(`/tracks/${new ObjectID()}`)
//      .expect(404)
//      .expect((res)=>{
//         expect(JSON.stringify( res.body.tracks)).toBeNull 
//      })
//      .end(done)
//       })




//       it ('should return 404 in case of invalid id',(done)=>{

//           request(app)
//           .get('/tracks/1234')
//           .expect(404)
//           .expect((res)=>{
//              expect(JSON.stringify( res.body.tracks)).toBeNull 
//           })
//           .end(done)
//            })



// });

describe('Like Track /tracks/like/:id', () => {
   it('Should like a Track', (done) =>
   {    var testuser = new User({
       email: "ranimemohamed8@gmail.com",
       password: "$2b$10$6/4iKym5yIP0j0lItY59G.VCwDod/S2QXuwEAVWZqutavXsQlivs.",
       userName: "Ranime",
       gender: "F",
       birthDate: '1999-05-30',
       isActive: true
   });
   testuser.save().then((res) => {
       testuser.generateAuthToken().then((token)=>{
           track.find().then((tracks) => {
           var trackId = tracks[0]._id;
       request(app)
       .post(`/tracks/like/${trackId}`)
       .set('x-auth',token)
       .expect(200)
       .end((err, res) => {
           if (err) {
               done(err)
           }
           User.findOneAndRemove({ _id: testuser._id }, function (err) {
               if (!err) {
    
                   done();
    
               }
               else {
                   done(err);
               }
           });
       });
   })
})
   });
});

it('Passing a valid token but an empty track id', (done) =>
{
   var trackId = "";
   User.find().then((users)=>{
       users[users.length-1].generateAuthToken().then((token)=>{
   request(app)
   .post(`/tracks/like/${trackId}`)
   .set('x-auth',token)
   .expect(404)
   .end(done)
   })
})
});

it('Passing a valid token but an invalid track id', (done) =>
{
   var trackId = "***";
   User.find().then((users)=>{
       users[users.length-1].generateAuthToken().then((token)=>{
   request(app)
   .post(`/tracks/like/${trackId}`)
   .set('x-auth',token)
   .expect(404)
   .end(done)
   })
})
});

   it('Passing an empty token ', (done) =>
   {
       var token = "";
       var trackId = "5e7e1df679d528b436c15247";
       request(app)
       .post(`/album/like/${trackId}`)
       .set('x-auth',token)
       .expect(401)
       .end(done)
   })

   it('Passing an inactive token ', (done) =>
   {
       var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
       track.find().then((tracks) => {
           var trackId = tracks[0]._id;
       request(app)
       .post(`/tracks/like/${trackId}`)
       .set('x-auth',token)
       .expect(401)
       .end(done)
       })
   })

   });







