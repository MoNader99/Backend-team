// JavaScript source code
//const expect = require('expect');
const chai = require('chai');
//onst chaiSubset = require('chai-subset');
//chai.use(chaiSubset);
const expect = chai.expect;
//var should = require('chai').should();
const request = require('supertest')
//local imports
const app = require('./../Index');
var { User } = require("../Services/UserServices");
var { artist } = require("../Services/ArtistServices.js");
var { album } = require("../Services/AlbumServices");
var { track } = require("../Services/TrackServices.js");
var albumservices = require("../Services/AlbumServices");
var artistservices = require("../Services/ArtistServices");
var userservices = require("../Services/UserServices");
var { playlist } = require("../models/playlists.js");

var _ = require('lodash');
//const defaultModule = require("./../defaultimage");

var testToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s';


describe('search /Search', () => {

    it('return album when the user searches for', (done) => {
        album.find().then((albums) => {
            var testalbum = albums[albums.length - 1];
            artistservices.GetArtistById(testalbum.artistId.toString()).then((name) => {
                request(app)
                    .get(`/Search`)
                    .set('x-auth', testToken)
                    .query('word', testalbum.albumName)
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.Albums.map(function (value) { return value._id })).to.include(testalbum._id.toString());
                        expect(res.body.Albums.map(function (value) { return value.artistName })).to.include(name);

                    })
                    .end(done)
            });
        })
    });
    it('return user when the user searches for', (done) => {
        User.find().then((users) => {
            var testuser = users[users.length - 1];

            request(app)
                .get(`/Search`)
                .set('x-auth', testToken)
                .query('word', testuser.userName)
                .expect(200)
                .expect((res) => {
                    expect(res.body.Users.map(function (value) { return value._id })).to.include(testuser._id.toString());
                })
                .end(done)

        })
    });
    it('return playlist when the user searches for', (done) => {
        
        User.find().then((users) => {
            var testuser = users[users.length-1];
           // userservices.GetUserById(id).then((name) => {
                var testplaylist = new playlist({
                    userId: testuser._id.toString(),
                    playlistName: "testing",
                    "tracks": [
                    ],
                    privacy: false,
                    __v: 0
                });
           
            testplaylist.save().then((res1) => {
                request(app)
                    .get(`/Search`)
                    .set('x-auth', testToken)
                    .query('word', testplaylist.playlistName)
                    .expect(200)
                    .expect((res) => {


                        expect(res.body.Playlists.map(function (value) { return value._id })).to.include(testplaylist._id.toString());

                        expect(res.body.Playlists.map(function (value) { return value.userName })).to.include(testuser.userName);
                        // end(done);

                    })
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        }
                        else {
                            album.findOneAndRemove({ _id: testplaylist._id }, function (err) {
                                if (err) {
                                    done(err)
                                }
                                else {
                                    done();
                                }
                            });
                        }
                    })
            }, (err) => {

                    done(err);
                });
                })


       // })
    });
    it('return tracks when the user searches for', (done) => {
        track.find().then((tracks) => {
            var testtrack = tracks[tracks.length - 1];
            artistservices.GetArtistById(testtrack.artistId.toString()).then((name) => {
                request(app)
                    .get(`/Search`)
                    .set('x-auth', testToken)
                    .query('word', testtrack.teackName)
                    .expect(200)
                    .expect((res) => {
                        console.log(testtrack);
                        //console.log(res.body.Tracks.map(function (value) { return value._id }));
                        expect(res.body.Tracks.map(function (value) { return value._id })).to.include(testtrack._id.toString());
                        expect(res.body.Tracks.map(function (value) { return value.artistName })).to.include(name);
                    })
                    .end(done)
            })
        })
    })
    it('return authorization error when the token is wrong', (done) => {
       var wrongtoken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68';
        track.find().then((tracks) => {
            var testtrack = tracks[tracks.length - 1];
            artistservices.GetArtistById(testtrack.artistId.toString()).then((name) => {
                request(app)
                    .get(`/Search`)
                    .set('x-auth', wrongtoken)
                    .query('word', testtrack.teackName)
                    .expect(401)
                    .expect((res) => {
                        console.log(testtrack);
                        expect(res.error.text).to.equal("Token is not valid");
                    })
                    .end(done)
            })
        })
    })
    it('return artists when the user searches for', (done) => {

        artist.find().then((artists) => {
            var testartist = artists[artists.length - 1];
            var testalbum = new album({
                artistId: testartist._id,
                albumName: "fortesting",
                tracks: []

            });
            var testtrack = new track({
                artistId: testartist._id,
                trackName: "searchtesting",
                rating: 10,
                duration: 360000,
                genre: "pop",
                url: "searchtesting"  // until we get real urls 
            });
            testtrack.save().then((res2) => {

                testalbum.save().then((res1) => {

                    request(app)
                        .get(`/Search`)
                        .set('x-auth', testToken)
                        .query('word', testartist.artistName)
                        .expect(200)
                        .expect((res) => {
                            //console.log(res.body.Tracks.map(function (value) { return value._id }));
                            expect(res.body.Artists.map(function (value) { return value._id })).to.include(testartist._id.toString());
                            expect(res.body.Albums.map(function (value) { return value._id })).to.include(testalbum._id.toString());
                            expect(res.body.Tracks.map(function (value) { return value._id })).to.include(testtrack._id.toString());

                            //album.findOneAndRemove({ _id: testalbum._id });

                            //end(done)




                            //
                            //
                        })
                        .end((err, res) => {
                            if (err) {
                                done(err)
                            }
                            album.findOneAndRemove({ _id: testalbum._id }, function (err) {
                                if (!err) {
                                    track.findOneAndRemove({ _id: testtrack._id }, function (err) {
                                        done();
                                    });

                                }
                                else {
                                    done(err);
                                }
                            });
                        })
                }, (err) => {

                    done(err);
                });
                console.log(res._id);
            }, (err) => {
                done(err);
            });
        }, (err) => {
            done(err);
        });
        // console.log(res._id);


    })
});

