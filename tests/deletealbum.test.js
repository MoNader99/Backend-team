const expect = require('expect');
const request = require('supertest')
//local
const app = require('./../Index');
var { artist } = require("./../models/artists.js");
var { album } = require("./../models/album.js");
//const defaultModule = require("./../defaultimage");
const { ObjectID } = require('mongodb');
var { User } = require("../Services/UserServices");

describe("Delete an album", () => {

    it("Should delete a an album", (done) => {
        artist.find({}).then((artists) => {
            var testartist=artists[artists.length-1]
            var testalbum = new album({
                artistId: testartist._id,
                albumName: "testalbum",
                tracks: []

            });
            testalbum.save().then((res) => {
            testartist.generateAuthToken().then((testToken) => {
                request(app)
                    .delete(`/album/${testalbum._id}/delete`)
                    .set('x-auth', testToken)
                    .expect(200, "deleted")
                    .end(done)
                })
            })
        }, (err) => {
            done(err);
        });
        })

  

    it("Should not delete an album by in correct artist", (done) => {
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
            album.find({}).then((albums) => {
                testalbum = albums[albums.length - 1];
                testartist.generateAuthToken().then((testToken) => {
                    request(app)
                        .delete(`/album/${testalbum._id.toString()}/delete`)
                        .set('x-auth', testToken)
                        .expect(403, "NotAuthorized")
                        .end((err, res) => {
                            if (err)  done(err);
                            artist.findOneAndRemove({ _id: testartist._id }, function (err) {
                                if (!err)   done();

                                else done(err);
                                
                            });
                        })
                })
            })
           
                
            }, (err) => {
                console.log(err);
            });
    });

    it("Should return 404 ifid is invalid", (done) => {

        
            artist.find({}).then((artists) => {
                testartist = artists[artists.length - 1];
                testartist.generateAuthToken().then((testToken) => {
                    request(app)
                        .delete(`/album/${7}/delete`)
                        .set('x-auth', testToken)
                        .expect(404, "invalid id")
                        .end(done)
                })
            })

    });

    it("Should return 404 if album is not found", (done) => {


        artist.find({}).then((artists) => {
            testartist = artists[artists.length - 1];
            testartist.generateAuthToken().then((testToken) => {
                request(app)
                    .delete(`/album/${new ObjectID()}/delete`)
                    .set('x-auth', testToken)
                    .expect(404, "Notfound")
                    .end(done)
            })
        })

    });
    it("Should return 403 if the token is not valid", (done) => {


        album.find({}).then((albums) => {
            testalbum = albums[albums.length - 1];
            
                request(app)
                    .delete(`/album/${testalbum._id}/delete`)
                    .set('x-auth', "wrongtoken")
                    .expect(401, "Token is not valid")
                    .end(done)
            })
        

    });

    it("Should reject if a user tries to delete an album", (done) => {

        User.find({}).then((users) => {
            album.find({}).then((albums) => {
                var testuser = users[users.length - 1];
                var testalbum = albums[albums.length - 1];
                testuser.generateAuthToken().then((testToken) => {
                    request(app)
                        .delete(`/album/${testalbum._id}/delete`)
                        .set('x-auth', "wrongtoken")
                        .expect(401, "Token is not valid")
                        .end(done)
                })
            })
        })
    });

  /*  it("Should not delete a single track with missing track name", (done) => {
        artist.find().then((users) => {
            users[users.length - 1].save()
            users[users.length - 1].generateAuthToken().then((testToken) => {
                var testTrackName;
                request(app)
                    .delete('/tracks')
                    .set('x-auth', testToken)
                    .send({
                        trackName: testTrackName,
                    })
                    .expect(400, "Pass the track name to delete")
                    .end(done)
            })
        })


    });


    it("Should not delete a single track if the track does not belong to this artist", (done) => {
        artist.find().then((users) => {
            users[0].save()
            users[0].generateAuthToken().then((testToken) => {
                var testTrackName = "Any track that the artist doesnot have!";
                request(app)
                    .delete('/tracks')
                    .set('x-auth', testToken)
                    .send({
                        trackName: testTrackName,
                    })
                    .expect(404, "Track not found to be deleted")
                    .end(done)
            })
        })
    });*/
})