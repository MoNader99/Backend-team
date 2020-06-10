const expect = require('expect');
const request = require('supertest')
//local
const app = require('./../Index');
var { artist } = require("./../models/artists.js");
var { album } = require("./../models/album.js");
//const defaultModule = require("./../defaultimage");
const { ObjectID } = require('mongodb');
var { User } = require("../Services/UserServices");
var testArtist;
var testUser;
var wrongToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmkTpkuUlTgJbAtQM68s';
testArtist = new artist({
    artistName: "testArtist",
    about: `Egyptian singer known professionally for nothing at all but still is pleased to be part and an artist in this application.Thank you babes `,
    genres: ["Arabic", "R&B"],
    imagePath: "defaultuser.png",
    rating: 4,
    gender: "M",
    birthDate: "1988-05-05",
    email: "testArtist@music.com"
});

testArtist.save();
describe('Init', function () {

    after(function (done) {
        artist.findOneAndRemove({ _id: testArtist._id.toString() }).then((artist) => {
            console.log(testArtist._id.toString());
            console.log(artist);
            done();

        })


    });
    describe("follow and unfollow artist", () => {

        it("Should follow artist", (done) => {

            User.find({}).then((users) => {
                testUser = users[users.length - 1];
                testUser.generateAuthToken().then((testToken) => {
                    request(app)
                        .post(`/follow/unfollow/artist/${testArtist._id.toString()}`)
                        .set('x-auth', testToken)
                        .expect(200, "You have followed the artist")
                        .end(done)
                })
            })
        }, (err) => {
            cosnole.log(err);
            done(err);
        });



        it("Should unfollow artist", (done) => {

            testUser.generateAuthToken().then((testToken) => {
                request(app)
                    .post(`/follow/unfollow/artist/${testArtist._id.toString()}`)
                    .set('x-auth', testToken)
                    .expect(200, "You have unfollowed the artist")
                    .end(done)
            })
        })
         it("refuse wrong token", (done) => {
            var testartist = new artist({
                 artistName: "testArtist",
                 about: `Egyptian singer known professionally for nothing at all but still is pleased to be part and an artist in this application.Thank you babes `,
                 genres: ["Arabic", "R&B"],
                 imagePath: "defaultuser.png",
                 rating: 4,
                 gender: "M",
                 birthDate: "1988-05-05",
                 email: "testArtist@music.com"
             });
     
             testartist.save();
                 //testUser = users[users.length - 1];
               //  testUser.generateAuthToken().then((testToken) => {
                     request(app)
                         .post(`/follow/unfollow/artist/${testartist._id.toString()}`)
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
                         .post(`/follow/unfollow/artist/${id.toString()}`)
                         .set('x-auth', testToken)
                         .expect(400, "Artist not found")
                         .end(done)
                 })
             })
         }, (err) => {
             cosnole.log(err);
             done(err);
             });
         it("Should refuse in valid id", (done) => {
             User.find({}).then((users) => {
                 testUser = users[users.length - 1];
                 testUser.generateAuthToken().then((testToken) => {
                     request(app)
                         .post(`/follow/unfollow/artist/5`)
                         .set('x-auth', testToken)
                         .expect(400, "artistId is not valid")
                         .end(done)
                 })
             })
         }, (err) => {
             cosnole.log(err);
             done(err);
         });
    })

});
