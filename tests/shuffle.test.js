const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("../models/users.js");
var {playlist} = require("../models/playlists.js");

describe('Shuffle playlist tracks /playlists/:playlistId/Shuffle', () => {

    it('Should shuffle playlist tracks', (done) =>
    {
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
                playlist.find().then((playlists)=> {
                    var id = playlists[playlists.length-1]._id;
                    request(app)
                    .get(`/playlists/${id.toString()}/Shuffle`)
                    .set('x-auth',token)
                    .expect(200)
                    .end(done)
                })
        
        })
    })
    });

    it('Passing Invalid playlist ID', (done) =>
    {
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
                    var id = 1111;
                    request(app)
                    .get(`/playlists/${id.toString()}/Shuffle`)
                    .set('x-auth',token)
                    .expect(400)
                    .end(done)
                
        
        })
    })
    });
    
    it('Passing a valid but non existing playlist ID', (done) =>
    {
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
                    var id = "11c1c3d0ad1cba1870c98c66";
                    request(app)
                    .get(`/playlists/${id}/Shuffle`)
                    .set('x-auth',token)
                    .expect(404)
                    .end(done)
                
        
        })
    })
    });


    it('Passing empty token', (done) =>
    {
        var token = "";
        request(app)
        .get(`/playlists/me`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })

    it('Passing an Invalid', (done) =>
    {
        var token = "any invalid token";
        request(app)
        .get(`/playlists/me`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })

    it('Passing valid token but did not find an according user', (done) =>
    {
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
        request(app)
        .get(`/playlists/me`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })





    
});
