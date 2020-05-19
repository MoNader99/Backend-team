const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{track}= require("../models/track.js");
var{album}= require("../models/album.js");
var{User}= require("../models/users.js");



describe('POST /tracks/rate/:id/:value', () => {

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
            .end((err, res) => {
                if (err) {
                  return  done(err);
                }
                track.findOne({_id:testTrack._id}).then((updated)=>{
                    expect(updated.rating).toBe(5);
                    expect(updated.noOfRatings).toBe(1);
                    track.findOneAndRemove({_id:testTrack._id}).then(()=>{
                      done();
                    })
                  }).catch((e)=>done(e))
                });
            });
        })
    })

 });

 it('should get average of ratings', (done) =>
 {
   User.find().then((users)=>
   {
     users[users.length-1].generateAuthToken().then((token)=>
     {
       track.findOne({trackName: "testTrack",}).then((found)=>
       {
          found.rating=5;
          found.noOfRatings=1;
          found.save().then((testTrack)=>{
            request(app)
            .post(`/tracks/rate/`+ testTrack._id+'/1')
            .set('x-auth',token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                  return  done(err);
                }
                track.findOne({_id:testTrack._id}).then((updated)=>{
                    expect(updated.rating).toBe(3);
                    expect(updated.noOfRatings).toBe(2);
                    track.findOneAndRemove({_id:testTrack._id}).then(()=>{
                      done();
                    })
                  }).catch((e)=>done(e))
                });
          })

           });
       })
   })

});
 it('should refuse empty token ', (done) =>
 {
         track.findOne({trackName: "testTrack",}).then((testTrack)=>
         {
             request(app)
             .post(`/tracks/rate/`+ testTrack._id+'/5')
             .expect(403)
           .end(done)
       })
   });

   it('should refuse invalid token ', (done) =>
   {

     track.findOne({trackName: "testTrack",}).then((testTrack)=>
     {
             request(app)
             .post(`/tracks/rate/`+ testTrack._id+'/5')
             .set('x-auth',"invalid token")
             .expect(401)
             .end(done)
         })
     });

     it("should return not found if the track doesn't exist ", (done) =>
     {

       User.find().then((users)=>
       {
         users[users.length-1].generateAuthToken().then((token)=>
         {
               request(app)
               .post('/tracks/rate/invalid/5')
               .set('x-auth',token)
               .expect(404)
               .end(done)
       })
      })
    });

  it("should reject invalid rating value ", (done) =>
    {

      User.find().then((users)=>
      {
        users[users.length-1].generateAuthToken().then((token)=>
        {
          track.findOne({trackName: "testTrack",}).then((testTrack)=>
          {
              request(app)
              .post(`/tracks/rate/`+testTrack._id+'/20')
              .set('x-auth',token)
              .expect(400)
              .end(done)
          })
      })
     })
   });

 })

///RATE ALBUM

 describe('POST /album/rate/:id/:value', () => {

   before((done)=>{
     var testAlbum=new album(
           {
               "artistId": "5ebdb176b4751d4be056a290",
               "albumName":"testAlbum",
           });

     testAlbum.save().then(()=> done());
   })

   after((done)=>{
     album.findOneAndRemove({albumName:"testAlbum",}).then(()=>{
       done();
     })
   })

   it('should rate the album for the first time', (done) =>
   {
     User.find().then((users)=>
     {
       users[users.length-1].generateAuthToken().then((token)=>
       {
         album.findOne({albumName: "testAlbum",}).then((testAlbum)=>
         {
             request(app)
             .post(`/album/rate/`+ testAlbum._id+'/5')
             .set('x-auth',token)
             .expect(200)
             .end((err, res) => {
                 if (err) {
                   return  done(err);
                 }
                 album.findOne({_id:testAlbum._id}).then((updated)=>{
                     expect(updated.rating).toBe(5);
                     expect(updated.noOfRatings).toBe(1);
                     done();
                   }).catch((e)=>done(e))
                 });
             });
         })
     })

  });

  it('should get average of ratings', (done) =>
  {
    User.find().then((users)=>
    {
      users[users.length-1].generateAuthToken().then((token)=>
      {
        album.findOne({albumName: "testAlbum",}).then((testAlbum)=>
        {
             request(app)
             .post(`/album/rate/`+ testAlbum._id+'/1')
             .set('x-auth',token)
             .expect(200)
             .end((err, res) => {
                 if (err) {
                   return  done(err);
                 }
                 album.findOne({_id:testAlbum._id}).then((updated)=>{
                     expect(updated.rating).toBe(3);
                     expect(updated.noOfRatings).toBe(2);
                     done();
                   }).catch((e)=>done(e))
                 });

            });
        })
    })

 });
  it('should refuse empty token ', (done) =>
  {
          album.findOne({albumName: "testAlbum",}).then((testAlbum)=>
          {
              request(app)
              .post(`/album/rate/`+ testAlbum._id+'/5')
              .expect(403)
            .end(done)
        })
    });

    it('should refuse invalid token ', (done) =>
    {

      album.findOne({albumName: "testAlbum",}).then((testAlbum)=>
      {
              request(app)
              .post(`/album/rate/`+ testAlbum._id+'/5')
              .set('x-auth',"invalid token")
              .expect(401)
              .end(done)
          })
      });

      it("should return not found if the album doesn't exist ", (done) =>
      {

        User.find().then((users)=>
        {
          users[users.length-1].generateAuthToken().then((token)=>
          {
                request(app)
                .post('/album/rate/invalid/5')
                .set('x-auth',token)
                .expect(404)
                .end(done)
        })
       })
     });

   it("should reject invalid rating value ", (done) =>
     {

       User.find().then((users)=>
       {
         users[users.length-1].generateAuthToken().then((token)=>
         {
           album.findOne({albumName: "testAlbum",}).then((testAlbum)=>
           {
               request(app)
               .post(`/album/rate/`+testAlbum._id+'/20')
               .set('x-auth',token)
               .expect(400)
               .end(done)
           })
       })
      })
    });

  })
