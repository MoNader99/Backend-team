const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("../models/users.js");
var {album} = require("../models/album.js");

describe('Get Album /album/:id', () => {

    it('Should get album', (done) =>
    {
        album.find().then((albums) => {
            var albumId = albums[0]._id;
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(302)
        .end(done)
        })
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


describe('Get Album Tracks /album/:id', () => {

    it('Should get album tracks', (done) =>
    {
        album.find().then((albums) => {
            var albumId = albums[0]._id;
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .get(`/album/${albumId}`)
        .set('x-auth',token)
        .expect(302)
        .end(done)
        })
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

describe('Like Album /album/like/:id', () => {
    it('Should like an Album', (done) =>
    {    var testuser = new User({
        email: "ranimemohamed8@gmail.com",
        password: "$2b$10$6/4iKym5yIP0j0lItY59G.VCwDod/S2QXuwEAVWZqutavXsQlivs.",
        userName: "Ranime",
        gender: "F",
        birthDate: '1999-05-30',
        isActive: true
    });
    testuser.save().then((res) => {
        testuser.generateAuthToken().then((token)=>{
            album.find().then((albums) => {
            var albumId = albums[0]._id;
        request(app)
        .post(`/album/like/${albumId}`)
        .set('x-auth',token)
        .expect(200)
        .end((err, res) => {
            if (err) {
                done(err)
            }
            User.findOneAndRemove({ _id: testuser._id }, function (err) {
                if (!err) {
     
                    done();
     
                }
                else {
                    done(err);
                }
            });
        });
    })
})
    });
});

it('Passing a valid token but an empty album id', (done) =>
{
    var albumId = "";
    User.find().then((users)=>{
        users[users.length-1].generateAuthToken().then((token)=>{
    request(app)
    .post(`/album/like/${albumId}`)
    .set('x-auth',token)
    .expect(404)
    .end(done)
    })
})
});

it('Passing a valid token but an invalid album id', (done) =>
{
    var albumId = "***";
    User.find().then((users)=>{
        users[users.length-1].generateAuthToken().then((token)=>{
    request(app)
    .post(`/album/like/${albumId}`)
    .set('x-auth',token)
    .expect(404)
    .end(done)
    })
})
});

    it('Passing an empty token ', (done) =>
    {
        var token = "";
        var albumId = "5e7e1df679d528b436c15247";
        request(app)
        .post(`/album/like/${albumId}`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })

    it('Passing an inactive token ', (done) =>
    {
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
        album.find().then((albums) => {
            var albumId = albums[0]._id;
        request(app)
        .post(`/album/like/${albumId}`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
        })
    })

    });


