const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("../Controllers/AlbumController.js");
var{User}= require("../models/users.js");

describe('Get Album /album/:id', () => {

    it('Passing a valid token for an existing album', (done) =>
    {
        var albumId = "5e7e1df679d528b436c15247";
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(302)
        .end(done)
        })
    })
    });


    it('Passing a valid token but an invalid album id', (done) =>
    {
        var albumId = "123&2";
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(404)
        .end(done)
        })
    })
    });

    it('Passing a valid token but an empty album id', (done) =>
    {
        var albumId = "";
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(404)
        .end(done)
        })
    })
    });

    it('Passing a valid token for an non existing album', (done) =>
    {
        var albumId = "5e7e1df679d528b436c15248";
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(404)
        .end(done)
        })
    })
    });

    it('Passing empty token', (done) =>
    {
        var albumId = "5e7e1df679d528b436c15247";
        var token = "";
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })
 
    it('Passing an Invalid', (done) =>
    {
        var albumId = "5e7e1df679d528b436c15247";
        var token = "any invalid token";
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })

    it('Passing valid token but did not find an according user', (done) =>
    {
        var albumId = "5e7e1df679d528b436c15247";
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })


   
});

