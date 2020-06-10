const expect = require("expect");
const request = require("supertest");
const app = require("./../Index");
var { User } = require("./../models/users.js");

describe("Recently Played Tracks", () => {
  it("Should get recenly played tracks", (done) => {
    User.find({ userName: "hamadaaa" }).then((users) => {
      users[users.length - 1].save();
      users[users.length - 1].generateAuthToken().then((token) => {
        request(app)
          .get("/tracks/recentlyplayed")
          .set("x-auth", token)
          .expect(302)
          .expect((res) => {
            res.length != 0;
          })
          .end(done);
      });
    });
  });

  it("Should not get recenly played tracks with invalid token", (done) => {
    var token = "abc";
    request(app)
      .get("/tracks/recentlyplayed")
      .set("x-auth", token)
      .expect(401, "Unauthorized Access")
      .end(done);
  });

  it("Should return an empty array if the user did not play any songs", (done) => {
    User.find().then((users) => {
      users[0].save();
      users[0].generateAuthToken().then((token) => {
        request(app)
          .get("/tracks/recentlyplayed")
          .set("x-auth", token)
          .expect(404, "You haven't played any tracks yet")
          .end(done);
      });
    });
  });
});
