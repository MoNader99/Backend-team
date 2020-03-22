// JavaScript source code
const expect = require('expect');
const request = require('supertest');

const { app } = require('./../Controllers/UserController');
const { User } = require('./../Controllers/UserController');

describe('POST/users/login', () => {
    it('shoul login a user', (done) => {
        request(app)
            .post('/users/login')
            .send({})
    })
});
