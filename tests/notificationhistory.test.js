// JavaScript source code
// JavaScript source code
//const expect = require('expect');
const chai = require('chai');
//onst chaiSubset = require('chai-subset');
//chai.use(chaiSubset);
const expect = chai.expect;
//var should = require('chai').should();
const request = require('supertest')
var { User } = require("../Services/UserServices");
var { artist } = require("../Services/ArtistServices.js");
var { notification } = require("../models/notifications.js");//notifications model
const app = require('./../Index');
var wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWM0NjE3ZjIzMTgyMzFjNWNiMDVmN2MiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg5OTI5MTYxfQ.pJxbron-8HZ7aEfUvrk2ohqlyAEjmT6suPCBqX3rWjI";
//var testArtistToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWM0NmEwYzZlNGFjMDI5MDQyNTdiNzEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg5OTMxOTM3fQ.nnB5KnoZrr3wsSKpsgBV6IxsJuyF0JgvUkYH0FAGtRs";
var testUser = new User({
    userName: "nona",
    email: "aya_1999_mahmoud@hotmail.com",
    password: "$2b$10$WeTRiKtN4pgpY8MRfhZFOuPIr3yPwUp07F0VQR44P8bODhmLCPSe6",
    gender: "F",
    birthDate: "1999-04-01",
    isActive: true,
    isPremium: false,
    endPoint: {
        "keys": {
            "auth": "uMwN7TJn8HNC2uEV4ChdPw",
            "p256dh": "BOGtA1AND4od-GzqXR0niqfGcmYDJX9RNtcCHUg-62MDctC0wp0-2TCHF0cghUA6t-CbJgl41bYX_ryspWOkDEo"
        },
        "expirationTime": null,
        "endpoint": "https://fcm.googleapis.com/fcm/send/fTG9C2w1Asc:APA91bEeyCBCibbMXJleTUX3cn14qzDu_hMkskpxRA_1-UXqNjx2j4B9jdK5DVUhJhZgWkIjrPCyFoaI2WBIg8vlwSrDnWjjk7ovAE6NMJlOhB41SiXRHAyLPXNl1KLu32XmpHto0Ac-"
    }
})
testUser.save();
var testArtist = new artist({
    artistName: "yoyo",
    email: "ayamahmoudabdelfatah99@gmail.com",
    password: "$2b$10$IeL9.Rf81agJriRiznHMyO5jVlcWvrwm/NO8GkZKnqSO/fsxU3xi.",
    gender: "F",
    birthDate: "1999-04-01",
    isActive: true,
    "endPoint": {
        "keys": {
            "auth": "4A01XSXT4KsJrAy7uhxKmQ",
            "p256dh": "BKEfgfOpYztOAH1IoPM2wK2VcxIn13yDVvPxCF_O9-yAcY-9qpRP6g3leCKb3zcLuso1FFo6NnoprQLF-7accj8"
        },
        "expirationTime": null,
        "endpoint": "https://fcm.googleapis.com/fcm/send/ebHh2YxK51E:APA91bHolSx3CGq7N60y162oPcEkOQVCRvhWQJJ4xpbfpsJoM1MgAUYBqt5tvhKO3OWwhgItviTOmtjb8u-dzYpyErztdtaTXULMxVJBVUIym9iZs433FI5udcy6YHlrXznJIkFrWWMZ"
    }
})
testArtist.save();
var not1 = new notification({
    text: "Eminem released a new Song (Lose Ypurself)",
    sent: true,
    sourceId: testUser._id,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    date: Date.now(),
    userType: "artist"

});
not1.save().then((res) => {
    console.log("not1");
    console.log(res._id);
}, (err) => {
    console.log(err);
});
var not2 = new notification({
    text: "Amr Diab released a new album",
    sent: true,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    sourceId: testUser._id,
    date: Date.now(),
    userType: "artist"

});
not2.save();
var not3 = new notification({
    text: "Eminem released a new Song (Lose Ypurself)",
    sent: true,
    sourceId: testUser._id,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    date: Date.now(),
    userType: "artist"

});
not3.save();

var not4 = new notification({
    text: "Amr Diab released a new album",
    sent: true,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    sourceId: testUser._id,
    date: Date.now(),
    userType: "artist"

});
not4.save();
var not5 = new notification({
    text: "Eminem released a new Song (Lose Ypurself)",
    sent: true,
    sourceId: testUser._id,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    date: Date.now(),
    userType: "artist"

});
not5.save();

var not6 = new notification({
    text: "Amr Diab released a new album",
    sent: true,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    sourceId: testUser._id,
    date: Date.now(),
    userType: "artist"

});
not6.save();
var not7 = new notification({
    text: "Eminem released a new Song (Lose Ypurself)",
    sent: true,
    sourceId: testUser._id,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    date: Date.now(),
    userType: "artist"

});
not7.save();

var not8 = new notification({
    text: "Amr Diab released a new album",
    sent: true,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    sourceId: testUser._id,
    date: Date.now(),
    userType: "artist"

});
not8.save();
var not9 = new notification({
    text: "Eminem released a new Song (Lose Ypurself)",
    sent: true,
    sourceId: testUser._id,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    date: Date.now(),
    userType: "artist"

});
not9.save();

var not10 = new notification({
    text: "Amr Diab released a new album",
    sent: true,
    shouldBeSentTo: [
        testUser._id.toString(),
        testArtist._id.toString()
    ],
    sourceId: testUser._id,
    date: Date.now(),
    userType: "artist"

});
not10.save();
var notifications = [not1,not2,not3,not4,not5,not6,not7,not8,not9,not10];
describe('notification history', () => {

    it('return the last 10 notifications for artist', (done) => {
        //var testalbum = albums[albums.length - 1];
        // artistservices.GetArtistById(testalbum.artistId.toString()).then((name) => {
        testArtist.generateAuthToken().then((testArtistToken) => {
            request(app)
                .get(`/notification/history`)
                .set('x-auth', testArtistToken)
                .expect(200)
                .expect((res) => {
                    // expect(res.body.Albums.map(function (value) { return value._id })).to.include(testalbum._id.toString());
                    notifications.forEach(notification => {
                        expect(res.body.map(function (value) { return value._id })).to.include(notification._id.toString());
                        console.log(notification._id.toString());
                        console.log(res.body.map(function (value) { return value._id }))
                    });
                })
                .end(done)
        });
    });
    it('return authorization error when the token is wrong', (done) => {

        request(app)
            .get(`/notification/history`)
            .set('x-auth', wrongToken)
            .expect(401)
            .expect((res) => {
                // console.log(testtrack);
                expect(res.error.text).to.equal("Token is not valid");
            })
            .end(done)
    })
    it('return the last 10 notifications for user', (done) => {
        testUser.generateAuthToken().then((testUserToken) => { 
                request(app)
                    .get(`/notification/history`)
                    .set('x-auth', testUserToken)
                    .expect(200)
                    .expect((res) => {
                       // expect(res.body.Albums.map(function (value) { return value._id })).to.include(testalbum._id.toString());
                        notifications.forEach(notification => {
                            expect(res.body.map(function (value) { return value._id })).to.include(notification._id.toString());
                            console.log(notification._id.toString());
                            console.log(res.body.map(function (value) { return value._id }))
                        });
                    })
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        }
                        else {
                            var i = 0;
                            artist.findOneAndRemove({ _id: testArtist._id.toString() }).then(() => {
                            })
                            User.findOneAndRemove({ _id: testUser._id.toString() }).then(() => {
                            })
                            notifications.forEach(not => {
                                notification.findByIdAndRemove({ _id: not._id.toString() }).then((noti) => {
                                    console.log(noti);
                                    if (i++ == 9) done();

                                })
                            });
                        }
                    })
        })
            //});
    });
 /*   it('return user when the user searches for', (done) => {
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
            var testuser = users[users.length - 1];
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


    })*/
})


