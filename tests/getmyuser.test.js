const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("../models/users.js");
const jwt = require('jsonwebtoken');

describe('Get user profile /users/me', () => {

    it('Get the user having the passed token (Valid)', (done) =>
    {
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .get(`/users/me`)
        .set('x-auth',token)
        .expect(302)
        .end(done)
        })
    })
    });

    it('Passing empty token', (done) =>
    {
        var token = "";
        request(app)
        .get(`/users/me`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })

    it('Passing an Invalid', (done) =>
    {
        var token = "any invalid token";
        request(app)
        .get(`/users/me`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })

    it('Passing valid token but did not find an according user', (done) =>
    {
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
        request(app)
        .get(`/users/me`)
        .set('x-auth',token)
        .expect(401)
        .end(done)
    })



});

describe('Change Password /users/changePassword', () => {
   
    it('It should refuse inactive user', (done) => {

        var testuser = new User({
            email: "nadamahmoudabdelfatah@gmail.com",
            password: "$2b$10$6/4iKym5yIP0j0lItY59G.VCwDod/S2QXuwEAVWZqutavXsQlivs.",
            userName: "Nada",
            gender: "F",
            birthDate: '1990-06-19',
            isActive: true
        });


        testuser.save().then((res) => {
            testuser.generateAuthToken().then((testToken)=>{
            request(app)
                .post('/users/changePassword')
                .set('x-auth', testToken)
                .send({oldPassword:"222", newPassword:"111",})
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
                           
                        }
                    });
                });
        }, (err) => {
            console.log(err);
        });

        })

    })



   it('Passing empty token', (done) =>
   {
       var token = "";
       request(app)
       .put(`/users/changePassword`)
       .set('x-auth',token)
       .expect(401)
       .end(done)
   })


    it('Passing valid token but did not find an according user', (done) =>
     {
         var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
         request(app)
         .put(`/users/changePassword`)
         .set('x-auth',token)
         .expect(401)
         .end(done)
     })


    });


