// JavaScript source code
const expect = require('expect');
const request = require('supertest');

//const { app } = require('./../Controllers/UserController');
//const { User } = require('./../Controllers/UserController');
var user2 = new User({
    email: "mario1cvlcvlpfflvld;23@gmail.com",
    password: "kok123",
    userName: "Mario1",
    gender: "F",
    birthDate: '1990-06-19',
});
user2.save().then((res) => {
    console.log(res._id);
}, (err) => {
    console.log(err);
});
/*describe('POST/users/login', () => {
    it('shoul login a user', (done) => {
        request(app)
            .post('/users/login')
            .send({})
    })
});*/
