const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const app=require('./../Index');
const {track}=require("./../models/track");
var{User}= require("../models/users.js");

describe('Top Tracks /tracks/top', () => {

    it('Should get top tracks', (done) =>
    {
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
                    request(app)
                    .get(`/tracks/top`)
                    .set('x-auth',token)
                    .expect(200)
                    .end(done)
                
        
            })
        })
   
    })
    
    it('Passing empty token', (done) =>
    {
        var token = "";
        request(app)
        .get(`/tracks/top`)
        .set('x-auth',token)
        .expect(403)
        .end(done)
    })

    it('Passing an Invalid', (done) =>
    {
        var token = "any invalid token";
        request(app)
        .get(`/tracks/top`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })

    it('Passing valid token but did not find an according user', (done) =>
    {
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
        request(app)
        .get(`/tracks/top`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })


    
    



    
});
