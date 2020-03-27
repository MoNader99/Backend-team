// JavaScript source code
const expect = require('expect');
const request = require('supertest');
const { app } = require('../Controllers/UserController.js');
const { User } = require('../models/users.js');
const jwt = require('jsonwebtoken');


describe('POST /users/login',()=>{

  it('It should refuse inactive user', (done) => {
      User.remove({}, () => {
          var user2 = new User({
              email: "nadamahmoudabdelfatah@gmail.com",
              password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
              userName: "Nada",
              gender: "F",
              birthDate: '1990-06-19'
          });


          user2.save().then((res) => {
              request(app)
                  .post('/users/login')
                  .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abc" })
                  .expect(403)
                  .expect((res) => {
                      console.log(res.error.text);
                      expect(res.error.text).toBe("Please go to your inbox and click the link to activate your Email.")
                     // console.log(res);
                      //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
                  })
             .end(done);
          }, (err) => {
              console.log(err);
          });
      });


  })


  it('It should add user', (done) => {
      User.remove({}, () => {
          var user2 = new User({
              email: "nadamahmoudabdelfatah@gmail.com",
              password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
              userName: "Nada",
              gender: "F",
              birthDate: '1990-06-19',
              isActive:true
          });


          user2.save().then((res) => {
              request(app)
                  .post('/users/login')
                  .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abc" })
                  .expect(200)
                  .expect((res) => {
                      //console.log(res.header.(x-auth));
                      //console.log(res.header['x-auth']);
                      expect(jwt.verify(res.header['x-auth'], 'secretkeyforuser')._id).toBe(user2._id.toString());
                      // console.log(res);
                      //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
                  })
                  .end(done);
          }, (err) => {
              console.log(err);
          });
      });


  })
  it('It  refuses user with wrong info', (done) => {
      User.remove({}, () => {
                  request(app)
                  .post('/users/login')
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
          }, (err) => {
              console.log(err);
          });
      });
  it('It should add user', (done) => {
      User.remove({}, () => {
          var user2 = new User({
              email: "nadamahmoudabdelfatah@gmail.com",
              password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
              userName: "Nada",
              gender: "F",
              birthDate: '1990-06-19',
              isActive: true
          });


          user2.save().then((res) => {
              request(app)
                  .post('/users/login')
                  .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abck" })
                  .expect(401)
                  .expect((res) => {
                      //console.log(res.header.(x-auth));
                      //console.log(res.header['x-auth']);
                      expect(res.error.text).toBe("Either email or passwrod is incorrect")
                      // console.log(res);
                      //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
                  })
                  .end(done);
          }, (err) => {
              console.log(err);
          });
      });


  })


})
//expect(jwt.verify(token, 'secretkeyforuser')._id).toBe(User[0]._id);
                  //  console.log(res.body);
/*describe('POST/users/login', () => {
    it('shoul login a user', (done) => {
        request(app)
            .post('/users/login')
            .send({})
    })
});*/
