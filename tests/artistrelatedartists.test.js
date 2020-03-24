const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("./../Controllers/UserController.js");
var{User}= require("./../models/users.js"); 
var{artist}= require("./../models/Artists.js"); 

//TOKEN HAS TO BE MANUALLY SET AFTER CREATING THE DATABASE IN EACH TEST

describe("Get artists playing the same genre as the sent artist",()=>{
    it("Should get an array of artists",(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testArtistId="5e776b83cca58cb00494bb84";

        request(app)
        .get('/artists/related')
        .set('x-auth',testToken)
        .send({
            artistId:testArtistId,
        }) 
        .expect(302)
        .end(done)

    });

    it("Should not get an array of artists with missing artist ID",(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testArtistId;

        request(app)
        .get('/artists/related')
        .set('x-auth',testToken)
        .send({
            artistId:testArtistId,
        }) 
        .expect(400,"Send the artist ID")
        .end(done)

    });   
    
    it("Should not get an array of artists invalid token",(done)=>{
        var testToken="any invalid test token";
        var testArtistId="5e776b83cca58cb00494bb84";

        request(app)
        .get('/artists/related')
        .set('x-auth',testToken)
        .send({
            artistId:testArtistId,
        }) 
        .expect(401,"Unauthorized Access")
        .end(done)

    });  
    
    it("Should not get an array of artists with invalid artist ID",(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testArtistId="125e776b83cca58cb00494bb84";

        request(app)
        .get('/artists/related')
        .set('x-auth',testToken)
        .send({
            artistId:testArtistId,
        }) 
        .expect(404,"Invalid Id")
        .end(done)

    }); 
    
    it("Should not get an array of artists with a valid artist ID that doesnot exist",(done)=>{
        var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3ZTg0M2U5NTc2MTk4MWU4MmY3MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0OTE2NTU0fQ.lUg-xvAF0Z_3TZ7m8ftvc9M_pOSfJgN6ekbvvPKsF4s';
        var testArtistId="5e776b83cca68cb00494bb99";

        request(app)
        .get('/artists/related')
        .set('x-auth',testToken)
        .send({
            artistId:testArtistId,
        }) 
        .expect(404,"Id not found")
        .end(done)

    }); 

});