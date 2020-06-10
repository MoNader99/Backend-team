const expect = require('expect');
const request = require('supertest')
//local
const app = require('./../Index');
var { artist } = require("./../models/artists.js");
var { album } = require("./../models/album.js");
var fs = require('fs');

describe("Add album",()=>{
    
    it('Should create a new album',(done)=>{
      artist.findOne({artistName:"Queen"}).then((artist)=>{
        artist.save()
        artist.generateAuthToken().then((testToken)=>{
        var testAlbumName = "Billie New Album";
        var testGenre="pop";
        request(app)
        .post('/album/newRelease')
        .set('x-auth',testToken)
        .set('Content-Type', 'application/form-data')
        .field('AlbumName',testAlbumName)
        .field('genre',testGenre)
        .attach('multipleTracks',fs.readFileSync('./testTracks/Billie Eilish - lovely ft. Khalid.mp3'),'Billie Eilish - lovely ft. Khalid.mp3')
        .attach('multipleTracks',fs.readFileSync('./testTracks/Billie Eilish - bad guy.mp3'),'Billie Eilish - bad guy.mp3')
        .expect(201)
        .end(done)
        })
        
      })
    })

    it('Should not create a new Album with missing or incorrect Authorization token',(done)=>{

        var testToken="Any wrong auth token";
        var testAlbumName = "Billie New Album";
        var testGenre="pop";
        
        request(app)
        .post('/album/newRelease')
        .set('x-auth',testToken)
        .set('Content-Type', 'application/form-data')
        .field('AlbumName',testAlbumName)
        .field('genre',testGenre)
        .attach('multipleTracks',fs.readFileSync('./testTracks/Billie Eilish - lovely ft. Khalid.mp3'),'Billie Eilish - lovely ft. Khalid.mp3')
        .attach('multipleTracks',fs.readFileSync('./testTracks/Billie Eilish - bad guy.mp3'),'Billie Eilish - bad guy.mp3')
        .expect(401)
        .end(done)
        })

        it('Should not create a new Album with missing album Name',(done)=>{

            artist.findOne({artistName:"Queen"}).then((artist)=>{
              artist.save()
              artist.generateAuthToken().then((testToken)=>{
              var testAlbumName = "";
              var testGenre="pop";
              
              request(app)
              .post('/album/newRelease')
              .set('x-auth',testToken)
              .set('Content-Type', 'application/form-data')
              .field('AlbumName',testAlbumName)
              .field('genre',testGenre)
              .attach('multipleTracks',fs.readFileSync('./testTracks/Billie Eilish - lovely ft. Khalid.mp3'),'Billie Eilish - lovely ft. Khalid.mp3')
              .attach('multipleTracks',fs.readFileSync('./testTracks/Billie Eilish - bad guy.mp3'),'Billie Eilish - bad guy.mp3')
              .expect(400,"Missing albumName")
              .end(done)
                })
             })
        })

        it('Should not create a new Album with missing album genre',(done)=>{

            artist.findOne({artistName:"Queen"}).then((artist)=>{
                artist.save()
                artist.generateAuthToken().then((testToken)=>{
                var testAlbumName = "Billie New Album";
                var testGenre="";  
              
              request(app)
                .post('/album/newRelease')
                .set('x-auth',testToken)
                .set('Content-Type', 'application/form-data')
                .field('AlbumName',testAlbumName)
                .field('genre',testGenre)
                .attach('multipleTracks',fs.readFileSync('./testTracks/Billie Eilish - lovely ft. Khalid.mp3'),'Billie Eilish - lovely ft. Khalid.mp3')
                .attach('multipleTracks',fs.readFileSync('./testTracks/Billie Eilish - bad guy.mp3'),'Billie Eilish - bad guy.mp3')
                .expect(400,"Missing genre")
                .end(done)
                })
             })
        }) 
        it('Should not create a new Album without providing audio files',(done)=>{
            artist.findOne({artistName:"Queen"}).then((user)=>{
              user.save()
              user.generateAuthToken().then((testToken)=>{
                var testAlbumName = "Billie New Album";
                var testGenre="pop";
              
              request(app)
                .post('/album/newRelease')
                .set('x-auth',testToken)
                .set('Content-Type', 'application/form-data')
                .field('AlbumName',testAlbumName)
                .field('genre',testGenre)
                .attach('multipleTracks',fs.readFileSync('./Pictures/defaultuser.png'),'defaultuser.png')
                .attach('multipleTracks',fs.readFileSync('./Pictures/f45550f043abcd91714368ead086045c.jpg'),'f45550f043abcd91714368ead086045c.jpg')
                .expect(400,"Please upload audio files")
                .end(done)
                })
             })    
          })
          it('Should not create a new Album without providing any files',(done)=>{
            artist.findOne({artistName:"Queen"}).then((user)=>{
              user.save()
              user.generateAuthToken().then((testToken)=>{
                var testAlbumName = "Billie New Album";
                var testGenre="pop";
              
              request(app)
                .post('/album/newRelease')
                .set('x-auth',testToken)
                .set('Content-Type', 'application/form-data')
                .field('AlbumName',testAlbumName)
                .field('genre',testGenre)
                .attach('multipleTracks',undefined,undefined)
                .expect(400,"Please upload at least one track")
                .end(done)
                })
             })    
          })

})        
