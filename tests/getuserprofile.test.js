const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("../models/users.js");

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
        .expect(400)
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



describe('Patch /users/me/editprofile', () => {

  it('should change userName, gender and birthdate together ', (done) =>
  {
      User.find().then((users)=>{
          users[users.length-1].generateAuthToken().then((token)=>{
            users[users.length-1].userName="ayman";
            users[users.length-1].save();
      request(app)
      .patch(`/users/me/editprofile`)
      .set('x-auth',token)
      .send({
 "userName":"test1",
  "gender":"F",
  "birthDate":"1955-12-05"

})
      .expect(200)
      .end(done)
      })
  })
  });

  it('should reject empty token', (done) =>
  {
      var token = "";
      request(app)
      .patch(`/users/me/editprofile`)
      .set('x-auth',token)
      .send({
    "userName":"bbb",
    "gender":"F",
    "birthDate":"1955-12-05"

    })
      .expect(401)
      .end(done)
  })

  it('should reject invalid token', (done) =>
  {
      var token = "any invalid token";
      request(app)
      .patch(`/users/me/editprofile`)
      .set('x-auth',token)
      .send({
 "userName":"test2",
  "gender":"F",
  "birthDate":"1955-12-05"

})
      .expect(401)
      .end(done)
  })

  it('should reject token of a user that does not exist', (done) =>
  {
      var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
      request(app)
      .patch(`/users/me/editprofile`)
      .set('x-auth',token)
      .send({
 "userName":"test3",
  "gender":"F",
  "birthDate":"1955-12-05"

})
      .expect(404)
      .end(done)
  })

 it('should reject invalid gender', (done) =>
  {
      User.find().then((users)=>{
          users[users.length-1].generateAuthToken().then((token)=>{
            users[users.length-1].userName="default";
            users[users.length-1].save();
      request(app)
      .patch(`/users/me/editprofile`)
      .set('x-auth',token)
      .send({
        "userName":"test4",
          "gender":"invalid",
          "birthDate":"1955-12-05"

        })
      .expect(400)
      .end(done)
      })
  })
  });

  it('should reject invalid date', (done) =>
   {
       User.find().then((users)=>{
           users[users.length-1].generateAuthToken().then((token)=>{
             users[users.length-1].userName="default";
             users[users.length-1].save();
       request(app)
       .patch(`/users/me/editprofile`)
       .set('x-auth',token)
       .send({
         "userName":"test4",
           "gender":"M",
           "birthDate":"invalid"

         })
       .expect(400)
       .end(done)
       })
   })
   });

   it('should allow no change in data', (done) =>
    {
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .patch(`/users/me/editprofile`)
        .set('x-auth',token)
        .send({
          "userName":  users[users.length-1].userName,
            "gender":  users[users.length-1].gender,
            "birthDate":  users[users.length-1].birthDate

          })
        .expect(200)
        .end(done)
        })
    })
    });

    it('should reject userName if it already exists', (done) =>
     {
         User.find().then((users)=>{
             users[users.length-1].generateAuthToken().then((token)=>{
               users[users.length-1].userName="default";
               users[users.length-1].save();
         request(app)
         .patch(`/users/me/editprofile`)
         .set('x-auth',token)
         .send({
           "userName":users[users.length-2].userName,
             "gender":"M",
             "birthDate": users[users.length-1].birthDate

           })
         .expect(403)
         .end(done)
         })
     })
     });



});
