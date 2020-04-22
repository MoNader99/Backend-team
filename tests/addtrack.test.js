const expect =require('expect');
const request = require('supertest');
const app=require('./../Index');
var{artist}= require("./../models/artists.js");
var fs = require('fs');

//TEST FOR MAX AUDIO FILE WHEN IMPLEMENTED 
describe("Add a Single Track",()=>{
    
    it('Should create a new Track',(done)=>{
      artist.findOne({artistName:"Amr Diab"}).then((user)=>{
        user.save()
        user.generateAuthToken().then((testToken)=>{
        var testTrackName = "Da Lw Etsab";
        var testGenre="Arabic";
        
        request(app)
          .post('/tracks/single')
          .set('x-auth',testToken)
          .set('Content-Type', 'application/form-data')
          .field('trackName',testTrackName)
          .field('genre',testGenre)
          .attach('track',fs.readFileSync('./testTracks/Amr Diab - Da lw etsab.mp3'),'Amr Diab - Da lw etsab.mp3')
          .expect(201)
          .expect((res)=>{
              expect(res.body.trackName).toBe(testTrackName)
              expect(res.body.genre).toBe(testGenre)
            })
            .end(done)
          })
       })
})

    it('Should not create a new Track with missing or incorrect Authorization token',(done)=>{

      var testToken="Any wrong auth token";
      var testTrackName = "Superlife";
      var testGenre="RPG";
      
      request(app)
      .post('/tracks/single')
      .set('x-auth',testToken)
      .set('Content-Type', 'application/form-data')
      .field('trackName',testTrackName)
      .field('genre',testGenre)
      .attach('track',fs.readFileSync('./testTracks/Amr Diab - Da lw etsab.mp3'),'Amr Diab - Da lw etsab.mp3')
      .expect(401,"Unauthorized Access")
      .end(done)
      })

    it('Should not create a new Track with missing track Name',(done)=>{

      artist.findOne({artistName:"Amr Diab"}).then((user)=>{
        user.save()
        user.generateAuthToken().then((testToken)=>{
        var testTrackName ="";
        var testGenre="Arabic";
        
        request(app)
          .post('/tracks/single')
          .set('x-auth',testToken)
          .set('Content-Type', 'application/form-data')
          .field('trackName',testTrackName)
          .field('genre',testGenre)
          .attach('track',fs.readFileSync('./testTracks/Amr Diab - Da lw etsab.mp3'),'Amr Diab - Da lw etsab.mp3')
          .expect(400,"Missing trackName")
          .end(done)
          })
       })
      })

      it('Should not create a new Track with missing track genre',(done)=>{

        artist.findOne({artistName:"Amr Diab"}).then((user)=>{
          user.save()
          user.generateAuthToken().then((testToken)=>{
          var testTrackName ="Monaya habiby tehes monaya.MONAYAAAA";
          var testGenre="";
          
          request(app)
            .post('/tracks/single')
            .set('x-auth',testToken)
            .set('Content-Type', 'application/form-data')
            .field('trackName',testTrackName)
            .field('genre',testGenre)
            .attach('track',fs.readFileSync('./testTracks/Amr Diab - Da lw etsab.mp3'),'Amr Diab - Da lw etsab.mp3')
            .expect(400,"Missing genre")
            .end(done)
            })
         })
        })      
        
  it('Should not create a new Track with the same track name for the same artist',(done)=>{
    artist.findOne({artistName:"Amr Diab"}).then((user)=>{
      user.save()
      user.generateAuthToken().then((testToken)=>{
      var testTrackName ="Da Lw Etsab";
      var testGenre="Arabic";
      
      request(app)
        .post('/tracks/single')
        .set('x-auth',testToken)
        .set('Content-Type', 'application/form-data')
        .field('trackName',testTrackName)
        .field('genre',testGenre)
        .attach('track',fs.readFileSync('./testTracks/Amr Diab - Da lw etsab.mp3'),'Amr Diab - Da lw etsab.mp3')
        .expect(409,"Cannot create 2 Tracks with the same name ("+testTrackName+") for the same artist")
        .end(done)
        })
     })    
  })

  it('Should not create a new Track without providing an audio file',(done)=>{
    artist.findOne({artistName:"Amr Diab"}).then((user)=>{
      user.save()
      user.generateAuthToken().then((testToken)=>{
      var testTrackName ="Da Lw Etsab22";
      var testGenre="Arabic";
      
      request(app)
        .post('/tracks/single')
        .set('x-auth',testToken)
        .set('Content-Type', 'application/form-data')
        .field('trackName',testTrackName)
        .field('genre',testGenre)
        .attach('track',fs.readFileSync('./Pictures/defaultuser.png'),'defaultuser.png')
        .expect(400,"Please upload a track")
        .end(done)
        })
     })    
  })

  it('Should not create a new Track without providing a file',(done)=>{
    artist.findOne({artistName:"Amr Diab"}).then((user)=>{
      user.save()
      user.generateAuthToken().then((testToken)=>{
      var testTrackName ="Da Lw Etsab22";
      var testGenre="Arabic";
      
      request(app)
        .post('/tracks/single')
        .set('x-auth',testToken)
        .set('Content-Type', 'application/form-data')
        .field('trackName',testTrackName)
        .field('genre',testGenre)
        .attach('track',undefined,undefined)
        .expect(400,"Please upload a track")
        .end(done)
        })
     })    
  })      

                       
});


