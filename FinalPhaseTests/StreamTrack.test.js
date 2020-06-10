const expect = require("expect");
const request = require("supertest");
///
const app = require('./../Index');
var { track } = require("./../models/track");
var { User } = require("./../models/users");

describe("Stream a Track", () => {
    it("Should Stream a Track", (done) => {
        User.find().then((myUsers) => {
            myUsers[0].generateAuthToken().then((token) => {
                track.find().then((allTracks) => {
                    request(app)
                        .get('/tracks/stream')
                        .set('x-auth', token)
                        .set('trackId', allTracks[0]._id)
                        .expect(200)
                        .end(done)
                })
            })
        })
    });
    it("Should not Stream a Track with missing track ID", (done) => {
        User.find().then((myUsers) => {
            myUsers[0].generateAuthToken().then((token) => {
                request(app)
                    .get('/tracks/stream')
                    .set('x-auth', token)
                    .expect(400, "Missing track ID")
                    .end(done)
            })
        })
    });
    it("Should not Stream a Track with unauthorized token", (done) => {
        request(app)
            .get('/tracks/stream')
            .set('x-auth', "dd")
            .expect(401, "Unauthorized Access")
            .end(done)
    });
});