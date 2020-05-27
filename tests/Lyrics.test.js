const expect = require("expect");
const request = require("supertest");
const app = require("./../Index");
var { User } = require("./../models/users.js");
var { track } = require("./../models/track.js");

describe("Lyrics Premium Feature", () => {
    it("Should Send the Lyrics of a song", (done) => {
        User.findOne({ userName: "hamadaaa12q2" }).then((myUser) => {
            myUser.generateAuthToken().then((token) => {
                track.findOne({ $and: [{ trackName: "Hello" }, { likes: 9 }] }).then((myTrack) => {
                    request(app)
                        .get("/tracks/lyrics")
                        .set("x-auth", token)
                        .set("trackId", myTrack._id)
                        .expect(200)
                        .expect((res) => {
                            res.length != 0;
                        })
                        .end(done);
                });
            });
        });
    });

    it("Should not Send the Lyrics of a song that has no lyrics", (done) => {
        User.findOne({ userName: "hamadaaa12q2" }).then((myUser) => {
            myUser.generateAuthToken().then((token) => {
                track.findOne({ $and: [{ trackName: "Mahrgan El Shbokshy" }, { likes: 9 }] }).then((myTrack) => {
                    request(app)
                        .get("/tracks/lyrics")
                        .set("x-auth", token)
                        .set("trackId", myTrack._id)
                        .expect(404, "This song has no lyrics")
                        .end(done);
                });
            });
        });
    });

    it("Should not Send the Lyrics of a song with missing Track ID", (done) => {
        User.findOne({ userName: "hamadaaa12q2" }).then((myUser) => {
            myUser.generateAuthToken().then((token) => {
                request(app)
                    .get("/tracks/lyrics")
                    .set("x-auth", token)
                    .expect(400, "Send a valid track Id")
                    .end(done);

            });
        });
    });

    it("Should not Send the Lyrics of a song with an invalid Track ID", (done) => {
        User.findOne({ userName: "hamadaaa12q2" }).then((myUser) => {
            myUser.generateAuthToken().then((token) => {
                request(app)
                    .get("/tracks/lyrics")
                    .set("x-auth", token)
                    .set("trackId", "6ecc64d4f973d6ac347fc6be")
                    .expect(404, "Invalid Track ID")
                    .end(done);

            });
        });
    });

    it("Should not Send the Lyrics of a song with invalid Token", (done) => {
        track.findOne({ $and: [{ trackName: "Hello" }, { likes: 9 }] }).then((myTrack) => {
            request(app)
                .get("/tracks/lyrics")
                .set("x-auth", "1234")
                .set("trackId", myTrack._id)
                .expect(401, "Unauthorized Access")
                .end(done);
        });
    });

    it("Should not Send the Lyrics of a song to a rregular user", (done) => {
        User.findOne({ userName: "Mario1" }).then((myUser) => {
            myUser.generateAuthToken().then((token) => {
                track.findOne({ $and: [{ trackName: "Hello" }, { likes: 9 }] }).then((myTrack) => {
                    request(app)
                        .get("/tracks/lyrics")
                        .set("x-auth", token)
                        .set("trackId", myTrack._id)
                        .expect(400, "Please upgrade to a premium account to enjoy this feature")
                        .end(done);
                });
            });
        });
    });
});