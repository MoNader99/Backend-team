const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("../models/users.js");
const jwt = require('jsonwebtoken');
var testToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s';

beforeEach((done)=>{
  User.remove({ "email":"sw.project.verify@gmail.com"}).then(()=> done());
})
describe('POST /users/login', () => {

    it('It should refuse inactive user', (done) => {

        var testuser = new User({
            email: "nadamahmoudabdelfatah@gmail.com",
            password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
            userName: "Nada",
            gender: "F",
            birthDate: '1990-06-19'
        });


        testuser.save().then((res) => {
            request(app)
                .post('/users/login')
                .set('x-auth', testToken)
                .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abc" })
                .expect(403)
                .expect((res) => {
                    console.log(res.error.text);
                    expect(res.error.text).toBe("Please go to your inbox and click the link to activate your Email.")
                    // console.log(res);
                    //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
                })
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
        }, (err) => {
            console.log(err);
        });



    })


    it('It should add user', (done) => {

        var testuser = new User({
            email: "nadamahmoudabdelfatah@gmail.com",
            password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
            userName: "Nada",
            gender: "F",
            birthDate: '1990-06-19',
            isActive: true
        });


        testuser.save().then((res) => {
            request(app)
                .post('/users/login')
                .set('x-auth', testToken)
                .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abc" })
                .expect(200)
                .expect((res) => {
                    //console.log(res.header.(x-auth));
                    //console.log(res.header['x-auth']);
                    expect(jwt.verify(res.header['x-auth'], 'secretkeyforuser')._id).toBe(testuser._id.toString());
                    // console.log(res);
                    //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
                })
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
        }, (err) => {
            done(err);
        });



    })
    it('It  refuses user with wrong info', (done) => {

        request(app)
            .post('/users/login')
            .set('x-auth', testToken)
            .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abc" })
            .expect(401)
            .expect((res) => {
                //console.log(res.header.(x-auth));
                //console.log(res.header['x-auth']);
                expect(res.error.text).toBe("Either email or passwrod is incorrect")
                // console.log(res);
                //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
            })
            .end(done);

    });
    it('It  refuses wrong token', (done) => {
        var wrongToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZy250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s'
        request(app)
            .post('/users/login')
            .set('x-auth', wrongToken)
            .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abc" })
            .expect(401)
            .expect((res) => {
                //console.log(res.header.(x-auth));
                //console.log(res.header['x-auth']);
                expect(res.error.text).toBe("Token is not valid")
                // console.log(res);
                //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
            })
            .end(done);

    });
    it('It should refuse user with wrong password', (done) => {

        var testuser = new User({
            email: "nadamahmoudabdelfatah@gmail.com",
            password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
            userName: "Nada",
            gender: "F",
            birthDate: '1990-06-19',
            isActive: true
        });


        testuser.save().then((res) => {
            request(app)
                .post('/users/login')
                .set('x-auth', testToken)
                .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abck" })
                .expect(401)
                .expect((res) => {
                    //console.log(res.header.(x-auth));
                    //console.log(res.header['x-auth']);
                    expect(res.error.text).toBe("Either email or passwrod is incorrect")
                    // console.log(res);
                    //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
                })
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

        }, (err) => {

            done(err);
        });


    })


})

describe('POST /users/signup', () => {

  it('should create new inactive user ', (done) =>
  {
    //  User.findByCredentials("sw.project.verify@gmail.com","1234").then((user)=>{
    //  User.findOneAndRemove(user._id).then(()=>{
    request(app)
    .post('/users/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "gender":"F",
      "day":"29",
     "month":"07",
     "year":"1999",
      "password":"abc1234",
      "isPremium":false,
      "userName":"testuser"

    })
    .expect((res)=>{
       //expect(res.text).toBe("User added Successfully as inActive. Waiting for Email Confirmation")
    })


    .end((err, res)=>{
      if (err)
      {
        return done(err);
      }
      User.findByEmail("sw.project.verify@gmail.com").then((user)=>{
        console.log(user)
        expect (user.isPremium).toBe(false);
        expect (user.userName).toBe("testuser");
        expect (user.gender).toBe("F");
        expect(user.isActive).toBe(false);
        var d= new Date("1999-07-29");
        expect (user.birthDate.toString()).toEqual(d);
        done();
      }).catch((e)=>done(e));

    })

  })

  it('should reject invalid gender ', (done) =>
  {
    request(app)
    .post('/users/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "isPremium":false,
      "userName":"testuser2",
      "gender":"x",
      "day":"29",
         "month":"07",
         "year":"1999"    })
    .expect(400)

    .end(done)

  })


  it('should reject empty email ', (done) =>
  {
    request(app)
    .post('/users/signup')
    .send({

      "password":"1234",
      "isPremium":false,
      "userName":"testuser3",
      "gender":"M",
      "day":"29",
         "month":"07",
         "year":"1999"
           })
    .expect(400)

    .end(done)

  })

  it('should reject empty userName ', (done) =>
  {
    request(app)
    .post('/users/signup')
    .send({
      "email":"sw222.project.verify@gmail.com",
      "password":"1234",
      "isPremium":false,
      "gender":"M",
      "day":"29",
         "month":"07",
         "year":"1999"
           })
    .expect(400)

    .end(done)

  })
  it('should reject empty password ', (done) =>
  {
    request(app)
    .post('/users/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "isPremium":false,
      "userName":"testuser2",
      "gender":"x",
      "day":"29",
         "month":"07",
         "year":"1999"
           })
    .expect(400)

    .end(done)

  })
  it('should reject empty gender ', (done) =>
  {
    request(app)
    .post('/users/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "isPremium":false,
      "userName":"testuser2",
      "day":"29",
         "month":"07",
         "year":"1999"
           })
    .expect(400)

    .end(done)

  })
  it('should reject empty birthdate ', (done) =>
  {
    request(app)
    .post('/users/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "isPremium":false,
      "userName":"testuser2",
      "gender":"M"
    })
    .expect(400)

    .end(done)

  })
  it('should reject userName if it already exists', (done) =>
  {
    User.find().then((users)=>{
      request(app)
      .post(`/users/signup`)
      .send({
        "userName":users[users.length-1].userName,
        "gender":"M",
        "email":"sw.project.verify@gmail.com",
        "password":"1234",
        "isPremium":false,
        "gender":"M",
        "day":"29",
           "month":"07",
           "year":"1999"
      })
      .expect(409)
      .end(done)

    })
  });

  it('should reject email if it already exists', (done) =>
  {
    User.find().then((users)=>{
      request(app)
      .post(`/users/signup`)
      .send({
        "email":users[users.length-1].email,
        "gender":"M",
        "userName":"testuser",
        "password":"1234",
        "isPremium":false,
        "gender":"M",
        "day":"29",
           "month":"07",
           "year":"1999"
      })
      .expect(409)
      .end(done)

    })
  });

  it('should reject invalid date ', (done) =>
  {
    request(app)
    .post('/users/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "isPremium":false,
      "userName":"testuser2",
      "gender":"M",
      "day":"invalid",
         "month":"07",
         "year":"1999"    })
    .expect(400)

    .end(done)

  })

  it('should reject invalid email', (done) =>
  {
    User.find().then((users)=>{
      request(app)
      .post(`/users/signup`)
      .send({
        "userName":"testuser",
        "gender":"M",
        "email":"invalid",
        "password":"1234",
        "isPremium":false,
        "gender":"M",
        "day":"29",
           "month":"07",
           "year":"1999"
      })
      .expect(409)
      .end(done)

    })

  });


})




describe('Patch /users/me/editprofile', () => {

  it('should change userName, gender and birthdate together ', (done) =>
  {
      User.find().then((users)=>{
          users[users.length-1].generateAuthToken().then((token)=>{
            users[users.length-1].userName="default1";
            users[users.length-1].save();
      request(app)
      .patch(`/users/me/editprofile`)
      .set('x-auth',token)
      .send({
     "userName":"test1",
      "gender":"F",
      "day":"29",
     "month":"07",
     "year":"1999"
            })

//           .expect((res)=>{
//           })
//
//
//           .end((err, res)=>{
//             if (err)
//             {
//               return done(err);
//             }
//             expect (res.status).toBe(200)
//             User.find({"userName":"test1"}).then((user)=>{
//               expect (user.gender).toBe("F");
//               var d= new Date("1999-07-29");
//               expect (user.birthDate.toString()).toEqual(d);
//               done();
//
//           })
// })
      .expect(200)
      .end(done)
        })
      })
})


  it('should reject empty token', (done) =>
  {
      var token = "";
      request(app)
      .patch(`/users/me/editprofile`)
      .set('x-auth',token)
      .send({
    "userName":"bbb",
    "gender":"F",
    "day":"29",
       "month":"07",
       "year":"1999"
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
  "day":"29",
     "month":"07",
     "year":"1999"
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
  "day":"29",
     "month":"07",
     "year":"1999"
})
      .expect(404)
      .end(done)
  })

 it('should reject invalid gender', (done) =>
  {
      User.find().then((users)=>{
          users[users.length-1].generateAuthToken().then((token)=>{
            users[users.length-1].userName="default2";
            users[users.length-1].save();
      request(app)
      .patch(`/users/me/editprofile`)
      .set('x-auth',token)
      .send({
        "userName":"test4",
          "gender":"invalid",
          "day":"29",
             "month":"07",
             "year":"1999"
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
             users[users.length-1].userName="default3";
             users[users.length-1].save();
       request(app)
       .patch(`/users/me/editprofile`)
       .set('x-auth',token)
       .send({
         "userName":"test4",
           "gender":"M",
           "day":"29",
              "month":"invalid",
              "year":"1999"
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
            "day":  users[users.length-1].birthDate.getDay(),
            "month":users[users.length-1].birthDate.getMonth(),
            "year":users[users.length-1].birthDate.getFullYear()

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
               users[users.length-1].userName="default4";
               users[users.length-1].save();
         request(app)
         .patch(`/users/me/editprofile`)
         .set('x-auth',token)
         .send({
           "userName":users[users.length-2].userName,
             "gender":"M",
             "day":  users[users.length-1].birthDate.getDay(),
             "month":users[users.length-1].birthDate.getMonth(),
             "year":users[users.length-1].birthDate.getFullYear()

           })
         .expect(409)
         .end(done)
         })
     })
     });



});






describe('GET /users/confirm/:code', () => {

    it('should activate existing user with a valid token', (done) =>
    {
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        request(app)
        .get(`/users/confirm/`+token)
        .expect(200)
        .end(done)
        })
    })
    });

    it('should reject invalid token', (done) =>
    {
         request(app)
        .get(`/users/confirm/invalid`)
        .expect(401)
        .end(done)
        })

    it('should reject user whose id does not exist', (done) =>
    {
      var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
        request(app)
        .get(`/users/confirm/`+token)
        .expect(404)
        .end(done)
        })

    });



    