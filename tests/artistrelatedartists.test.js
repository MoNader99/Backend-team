const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("./../models/users.js"); 
var{artist}= require("./../models/artists.js");  



describe("Get artists playing the same genre as the sent artist",()=>{
   var token="eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s";
    it("Should get an array of artists",(done)=>{
        artist.findOne({artistName:"Eminem"}).then((myArt)=>{
            request(app)
            .get('/users/artists/related')
            .set('x-auth',token)
            .set('artistId',myArt._id.toString())
            .expect(302)
            .end(done)
            })

 });

    it("Should not get an array of artists with missing artist ID",(done)=>{
        var testArtistId="";
        request(app)
        .get('/users/artists/related')
        .set('x-auth',token)
        .set('artistId',testArtistId)
        .expect(400,"Send the artist ID")
        .end(done)
     });   
    
    it("Should not get an array of artists invalid token",(done)=>{
        var testToken2="any invalid test token";
        var testArtistId="ssss";

        request(app)
        .get('/users/artists/related')
        .set('x-auth',testToken2)
        .set('artistId',testArtistId)
        .expect(401,"Token is not valid")
        .end(done)

    });  
    
    it("Should not get an array of artists with invalid artist ID",(done)=>{
        var testArtistId="125e776b83cca58cb00494bb84";
        request(app)
        .get('/users/artists/related')
        .set('x-auth',token)
        .set('artistId',testArtistId)
        .expect(404,"Invalid Id")
        .end(done)
    }); 
    
    it("Should not get an array of artists with a valid artist ID that doesnot exist",(done)=>{
        var testArtistId="5e776b83cca68cb00494bb99";
        request(app)
        .get('/users/artists/related')
        .set('x-auth',token)
        .set('artistId',testArtistId) 
        .expect(404,"Id not found")
        .end(done)
    }); 

});