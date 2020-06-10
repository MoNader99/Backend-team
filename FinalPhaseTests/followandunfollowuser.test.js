const expect = require('expect');
const request = require('supertest')
//local
const app = require('./../Index');
var { User } = require("./../models/artists.js");
//const defaultModule = require("./../defaultimage");
const { ObjectID } = require('mongodb');
var { User } = require("../Services/UserServices");
var testUser1;
var testUser;
var wrongToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmkTpkuUlTgJbAtQM68s';
testUser1 = new User({
    email: "testmail@hotmail.com",
    password: "$2b$10$tZ9A05CzdvX9AodV6Q/aZOt/8bIIJT78rN3Ax1txwfkY8MJujc4ZK",
    userName: "test user2",
    isPremium: "false",
    gender: "F",
    birthDate: "01-02-2001"
});

testUser1.save();

after(function (done) {
    User.findOneAndRemove({ _id: testUser1._id.toString() }, function (err) {
        done();
    });


});
describe("follow and unfollow user", () => {

    it("Should follow user", (done) => {

        User.find({}).then((users) => {
            testUser = users[users.length - 1];
            testUser.generateAuthToken().then((testToken) => {
                request(app)
                    .post(`/follow/unfollow/user/${testUser1._id.toString()}`)
                    .set('x-auth', testToken)
                    .expect(200, "You have followed the user")
                    .end(done)
            })
        })
    }, (err) => {
        cosnole.log(err);
        done(err);
    });



    it("Should unfollow user", (done) => {

        testUser.generateAuthToken().then((testToken) => {
            request(app)
                .post(`/follow/unfollow/user/${testUser1._id.toString()}`)
                .set('x-auth', testToken)
                .expect(200, "You have unfollowed the user")
                .end(done)
        })
    })
    it("refuse wrong token", (done) => {

        //testUser = users[users.length - 1];
        //  testUser.generateAuthToken().then((testToken) => {
        request(app)
            .post(`/follow/unfollow/user/${testUser1._id.toString()}`)
            .set('x-auth', wrongToken)
            .expect(401, "Token is not valid")
            .end(done)
        //  })
    }, (err) => {
        cosnole.log(err);
        done(err);
    });
    it("Should refuse wrong id", (done) => {
        var id = new ObjectID();
        User.find({}).then((users) => {
            testUser = users[users.length - 1];
            testUser.generateAuthToken().then((testToken) => {
                request(app)
                    .post(`/follow/unfollow/user/${id.toString()}`)
                    .set('x-auth', testToken)
                    .expect(400, "User not found")
                    .end(done)
            })
        })
    }, (err) => {
        cosnole.log(err);
        done(err);
    });
    it("Should refuse invalid id", (done) => {

        User.find({}).then((users) => {
            testUser = users[users.length - 1];
            testUser.generateAuthToken().then((testToken) => {
                request(app)
                    .post(`/follow/unfollow/user/5`)
                    .set('x-auth', testToken)
                    .expect(400, "userId is not valid")
                    .end(done)
            })
        })
    }, (err) => {
        cosnole.log(err);
        done(err);
    });
})