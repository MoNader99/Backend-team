const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("./../Controllers/UserController.js");
var{User}= require("./../models/users.js"); 
var{artist}= require("./../models/Artists.js"); 

//TOKEN HAS TO BE MANUALLY SET AFTER CREATING THE DATABASE IN EACH TEST

describe("Get artists playing the same genre as the sent artist",()=>{
    var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdhNmVkM2JkZDZkNDY4NDhjMjdjOGEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1MDgyMDczfQ.NUn44gK8NuWM6Reqm6OwC8jnED9owl72Zy0_QfyXTGA';
    it("Should get an array of artists",(done)=>{
      
        var testArtistId="5e7a69082e81c5646260bd0d";

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
        var testToken2="any invalid test token";
        var testArtistId="5e776b83cca58cb00494bb84";

        request(app)
        .get('/artists/related')
        .set('x-auth',testToken2)
        .send({
            artistId:testArtistId,
        }) 
        .expect(401,"Unauthorized Access")
        .end(done)

    });  
    
    it("Should not get an array of artists with invalid artist ID",(done)=>{
      
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