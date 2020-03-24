const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("./../Controllers/PlaylistController.js");
var{images}= require("./../models/images.js"); // images model
var{User}= require("./../models/users.js"); 
var{playlist}= require("./../models/playlists.js"); 


//TOKEN HAS TO BE MANUALLY SET AFTER CREATING THE DATABASE IN EACH TEST

describe('Create a new playlist',()=>{
   it('Should create a new playlist and add the new image to the images collection',(done)=>{
       var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
       var testPlaylistName="Moraba3";
       var testImage = new images({
        url:"This is the test image of the playlist ",
        height:224,
        width:110,
    });
       var testPrivacy=true;
       request(app)
       .post('/playlists')
       .set('x-auth',testToken)
       .send({
           playlistName:testPlaylistName,
           privacy:testPrivacy,
           image:testImage,
       }) 
       .expect(201)
       .expect((res)=>{
           expect(res.body.playlistName).toBe(testPlaylistName)
           expect(res.body.privacy).toBe(testPrivacy)
       }) 
       .end(done)


    }); 

    it('Should create a new playlist and doesnot add an image (image is already saved)',(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName="Moraba32";
        var testImage = new images({
         url:"This is the test image of the playlist ",
         height:224,
         width:110,
     });
        var testPrivacy=true;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
            image:testImage,
        }) 
        .expect(201)
        .expect((res)=>{
            expect(res.body.playlistName).toBe(testPlaylistName)
            expect(res.body.privacy).toBe(testPrivacy)
        }) 
        .end(done)
 
 
     });  
     
     
    it('Should create a new playlist without providing privacy',(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName="Moraba323";
        var testImage = new images({
         url:"This is the test image of the playlist ko ko ",
         height:224,
         width:110,
     });
        var testPrivacy;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
            image:testImage,
        }) 
        .expect(201)
        .expect((res)=>{
            expect(res.body.playlistName).toBe(testPlaylistName)
            
        }) 
        .end(done)
 
 
    });  
     
    it('Should create a new playlist without providing an Image',(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName="Moraba3213";
        var testImage=undefined;
        var testPrivacy=false;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
            image:testImage,
        }) 
        .expect(201)
        .expect((res)=>{
            expect(res.body.playlistName).toBe(testPlaylistName)
            expect(res.body.privacy).toBe(testPrivacy)
        }) 
        .end(done)
 
 
    });  

    it('Should create a new playlist without providing an Image and privacy',(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName="Moraba3213ma2";
        var testImage=undefined;
        var testPrivacy;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
            image:testImage,
        }) 
        .expect(201)
        .expect((res)=>{
            expect(res.body.playlistName).toBe(testPlaylistName)
            
        }) 
        .end(done)
 
 
    });    
     
    it('Should not create a new playlist with invalid token',(done)=>{
        var testToken='This is an invalid token';
        var testPlaylistName="Moraba322";
        var testImage = new images({
         url:"This is the test image of the playlist1 ",
         height:224,
         width:110,
     });
        var testPrivacy=true;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
            image:testImage,
        }) 
        .expect(401,'Unauthorized Access')
        .end(done)
 
 
    });   
    
   

    it('Should not create a new playlist without a playlist name',(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName;
        var testImage = new images({
         url:"This is the test image of the playlist ko ",
         height:224,
         width:110,
     });
        var testPrivacy=true;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
            image:testImage,
        }) 
        .expect(400,'Playlist must have a name')
        .end(done)
 
 
    }); 
    
    it('Should not create a new playlist with the same name of an exisiting playlist for the same user',(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName="Moraba3";
        var testImage = new images({
         url:"This is the test image of the playlist ko mana ",
         height:224,
         width:110,
     });
        var testPrivacy=true;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
            image:testImage,
        }) 
        .expect(400,"Cannot create 2 playlists with the same name")
        .end(done)
 
 
    });      
   }) 
    

