// JavaScript source code
const expect = require('expect');
const request = require('supertest')
//local imports
const app = require('./../Index');
var { artist } = require("../models/artists.js");
const jwt = require('jsonwebtoken');
//const defaultModule = require("./../defaultimage");
var testToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s';

describe('POST /artists/login', () => {

    it('It should refuse inactive user', (done) => {



        var testartist = new artist({
            email: "nadamahmoudabdelfatah@gmail.com",
            password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
            artistName: "shaza",
            about: `Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter
    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.
     Adele's first two albums, 19 and 21, earned her critical praise and a level of
      commercial success unsurpassed among her peers.`,
            genres: ["pop", "R&B"],
            rating: 4,
            gender: "M",
            birthDate: "1988-05-05"
        });
        testartist.save().then((res) => {
            request(app)
                .post('/artists/login')
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
                    artist.findOneAndRemove({ _id: testartist._id }, function (err) {
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


    it('It should add artist', (done) => {

        var testartist = new artist({
            email: "nadamahmoudabdelfatah@gmail.com",
            password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
            artistName: "shaza",
            about: `Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter
    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.
     Adele's first two albums, 19 and 21, earned her critical praise and a level of
      commercial success unsurpassed among her peers.`,
            genres: ["pop", "R&B"],
            rating: 4,
            isActive: true,
            gender: "M",
            birthDate: "1988-05-05"
        });


        testartist.save().then((res) => {
            request(app)
                .post('/artists/login')
                .set('x-auth', testToken)
                .send({ "email": "nadamahmoudabdelfatah@gmail.com", "password": "abc" })
                .expect(200)
                .expect((res) => {
                    //console.log(res.header.(x-auth));
                    //console.log(res.header['x-auth']);
                    expect(jwt.verify(res.header['x-auth'], 'secretkeyforartist')._id).toBe(testartist._id.toString());
                    // console.log(res);
                    //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
                })
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    artist.findOneAndRemove({ _id: testartist._id }, function (err) {
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
            .post('/artists/login')
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
    it('It should refuse user with wrong password', (done) => {

        var testartist = new artist({
            email: "nadamahmoudabdelfatah@gmail.com",
            password: "$2b$10$omJZRaDaSrwjJyNnbOj6qe.BiOuWkqus4T4f7cNnfqZ22WV3.sS3y",
            artistName: "shaza",
            about: `Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter
    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.
     Adele's first two albums, 19 and 21, earned her critical praise and a level of
      commercial success unsurpassed among her peers.`,
            genres: ["pop", "R&B"],
            rating: 4,
            isActive: true,
            gender: "M",
            birthDate: "1988-05-05"
        });


        testartist.save().then((res) => {
            request(app)
                .post('/artists/login')
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
                    artist.findOneAndRemove({ _id: testartist._id }, function (err) {
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

    it('It  refuses wrong token', (done) => {
        var wrongToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZy250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s'
        request(app)
            .post('/artists/login')
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
})
