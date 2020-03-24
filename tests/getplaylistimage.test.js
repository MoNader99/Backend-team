const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("./../Controllers/PlaylistController.js");
var{images}= require("./../models/images.js"); // images model
var{User}= require("./../models/users.js"); 
var{playlist}= require("./../models/playlists.js"); 


//TOKEN HAS TO BE MANUALLY SET AFTER CREATING THE DATABASE IN EACH TEST

describe("Get Image of a playlist",()=>{
    it("Should get the image of a playlist",(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName="Moraba3";
        request(app)
        .get('/playlists/image')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
        }) 
        .expect(302)
        .end(done)
    });

    it("Should not get the image of a playlist with unauthorized access",(done)=>{
        var testToken='invalid tokken';
        var testPlaylistName="Moraba3";
        request(app)
        .get('/playlists/image')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
        }) 
        .expect(401,"Unauthorized Access")
        .end(done)
    });    


    it("Should not get the image of a playlist without passing the playlist name",(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName;
        request(app)
        .get('/playlists/image')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
        }) 
        .expect(400,"Pass the playlistname to get it's image")
        .end(done)
    }); 
    
    
    it("Should not get the image of a playlist that doesnot belong to this user",(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testPlaylistName="RecyleBin";
        request(app)
        .get('/playlists/image')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
        }) 
        .expect(404,"Playlist does not exist")
        .end(done)
    });     
})