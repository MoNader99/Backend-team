const expect =require('expect');
const request = require('supertest')
//local imports
var fs = require('fs');

const app=require('./../Index');
var{User}= require("../models/users.js");
const jwt = require('jsonwebtoken');
var testToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s';

var testInputToken = 'EAAPsCFCfTXwBABn6gyg4zZCyUYZBY9ZCwIpDYWdwjg6JZBAvNcD7U253rccl8cR7TJltBlqBMZBucBFASdau6Nh22QrTeJvxPDy12RIfdlbohQ70j8fvTFFWUYYyC5jFhwEkbkCcGkfsYJmpJCxNgC5EBOSZA9str1OzoV5FWN4cekjA8lML93MDfKJ4sylNmW03e5HaYLuJFdQ1cZBHTdsFxGDtaudmj9PW3DFCAU2vwZDZD';
var testAccessToken = '1103945386642812|q3IjOqkmzeCMBy9ettlIZr0XTo8';


describe('POST /users/loginwithfacebook', () => {
    it('It should refuse wrong facebook token', (done) => {


        /// testuser.save().then((res) => {
        request(app)
            .post('/users/loginwithfacebook')
            .set('access_token', testAccessToken)
            .set('input_token', testInputToken)
            .set('Content-Type', 'application/form-data')
            .field('userName', 'fb')
            .field('email', 'testuser')
            .field('gender', 'F')
            .field('bdate', '07-07-2003')
            .attach('photo', fs.readFileSync('./testImages/test1.png'), 'test1.png')
            .expect(400)
            .expect((res) => {

                expect(res.error.text).toBe("wrong paramters");
                //done();
                // console.log(res);
                //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
            })
            .end(done);
        /*  }, (err) => {
              console.log(err);
          });*/



    })
    it('It should loginfacebook user for the first time', (done) => {


       /// testuser.save().then((res) => {
            request(app)
                .post('/users/loginwithfacebook')
                .set('access_token', testAccessToken)
                .set('input_token', testInputToken)
                .set('Content-Type', 'application/form-data')
                .field('userName', 'fb')
                .field('email', 'testuser@gmail.com')
                .field('gender', 'F')
                .field('bdate', '07-07-2003')
                .attach('photo', fs.readFileSync('./testImages/test1.png'), 'test1.png')
                .expect(200)
                .expect((res) => {
                   // var nono = func();
                   // console.log("nono");

                   // console.log(nono[0]);
                    //console.log(arr);
                    User.findOne({ 'email': 'testuser@gmail.com' }).then((user) => {
                        console.log("user");
                        console.log(user);
                        expect(jwt.verify(res.header['x-auth'], 'secretkeyforuser')._id).toBe(user._id.toString());
                        done();
                    }).catch((err) => {done(err)})
                    // console.log(res);
                    //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
                })
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }

                   /* User.findOneAndRemove({ email: "testuser@gmail.com" }, function (err) {
                        if (!err) {

                            done();

                        }
                        else {
                            done(err);
                        }
                    });*/
                });
      /*  }, (err) => {
            console.log(err);
        });*/



    })
    it('It should loginfacebook user after thefirst time', (done) => {


        /// testuser.save().then((res) => {
        request(app)
            .post('/users/loginwithfacebook')
            .set('access_token', testAccessToken)
            .set('input_token', testInputToken)
            .set('Content-Type', 'application/form-data')
            .field('userName', 'fb')
            .field('email', 'testuser@gmail.com')
            .field('gender', 'F')
            .field('bdate', '07-07-2003')
            .attach('photo', fs.readFileSync('./testImages/test1.png'), 'test1.png')
            .expect(200)
            .expect((res) => {
                // var nono = func();
                // console.log("nono");

                // console.log(nono[0]);
                //console.log(arr);
                User.findOne({ 'email': 'testuser@gmail.com' }).then((user) => {
                    console.log("user");
                    console.log(user);
                    expect(jwt.verify(res.header['x-auth'], 'secretkeyforuser')._id).toBe(user._id.toString());
                    done();
                }).catch((err) => { done(err) })
                // console.log(res);
                //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                /* User.findOneAndRemove({ email: "testuser@gmail.com" }, function (err) {
                     if (!err) {

                         done();

                     }
                     else {
                         done(err);
                     }
                 });*/
            });
        /*  }, (err) => {
              console.log(err);
          });*/



    })

  

})
