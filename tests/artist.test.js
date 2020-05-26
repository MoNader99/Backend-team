const expect = require('expect');
const request = require('supertest')//.agent(app.listen());
const { ObjectID } = require('mongodb');
const app = require('./../Index');
//const{app}=require("./../Controllers/TracksController")
//const {track}=require("./../Controllers/TracksController"); //tracks model
const { artist } = require("./../models/artists");

var testToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s';

describe('Get /artists/:id', () => {


    it('should return an artist with the given id', (done) => {

        artist.find().then((artists) => {
            var id = artists[artists.length-1]._id.toHexString();

            var test = JSON.stringify(artists[artists.length - 1]);
            request(app)
                .get(`/artists/${id}`)
                .set('x-auth', testToken)
                .expect(200)
                .expect((res) => {
                    expect(JSON.stringify(res.body.artist)).toEqual(test)
                })
                .end(done)
        })

    })


    it('should return 404 if artist was not found', (done) => {

        request(app)
            .get(`/artists/5`)
            .set('x-auth', testToken)
            .expect(404)
            .expect((res) => {

                expect(res.error.text).toBe("invalid id");
            })
            .end(done)
    })
    it('should return 404 if no artist is valid', (done) => {


        request(app)
            .get(`/artists/${new ObjectID()}`)
            .set('x-auth', testToken)
            .expect(404)
            .expect((res) => {

                expect(res.error.text).toBe("can not find artist");
            })
            .end(done)
    })



    it('should return 404 in case of invalid id', (done) => {

        request(app)
            .get('/artists/5')
            .set('x-auth', "wrongToken")
            .expect(401)
            .expect((res) => {

                expect(res.error.text).toBe("Token is not valid");
            })
            .end(done)
    })



});

beforeEach((done)=>{
  artist.remove({ "email":"sw.project.verify@gmail.com"}).then(()=> done());
})

describe('POST /artists/signup', () => {

  it('should create new inactive artist ', (done) =>
  {
    request(app)
    .post('/artists/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "artistName":"testuser",
      "gender":"F",
      "day":"29",
         "month":"07",
         "year":"1999"
    })
    .expect((res)=>{
      //  expect(res.body.text).toBe("User added Successfully as inActive. Waiting for Email Confirmation")
    })


    .end((err, res)=>{
      if (err)
      {
        return done(err);
      }
      artist.findByEmail("sw.project.verify@gmail.com").then((a)=>{
        console.log(a);
        expect (a.artistName).toBe("testuser");
        expect (a.gender).toBe("F");
        var d= new Date("1999-07-29");
        expect (a.birthDate.toString()).toEqual(d);
        expect(a.isActive).toBe(false);
        done();
      }).catch((e)=>done(e));

    })

  })

  it('should reject invalid gender ', (done) =>
  {
    request(app)
    .post('/artists/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "artistName":"testuser2",
      "gender":"x",
      "day":"29",
         "month":"07",
         "year":"1999"
    })
    .expect(400)

    .end(done)

  })


  it('should reject empty email ', (done) =>
  {
    request(app)
    .post('/artists/signup')
    .send({

      "password":"1234",
      "artistName":"testuser3",
      "gender":"M",
      "day":"29",
         "month":"07",
         "year":"1999"
    })
    .expect(400)

    .end(done)

  })

  it('should reject empty artistName ', (done) =>
  {
    request(app)
    .post('/artists/signup')
    .send({
      "email":"sw222.project.verify@gmail.com",
      "password":"1234",
      "gender":"M",
      "day":"29",
         "month":"07",
         "year":"1999"
    })
    .expect(400)

    .end(done)

  })
  it('should reject empty password ', (done) =>
  {
    request(app)
    .post('/artists/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "artistName":"testuser2",
      "gender":"x",
      "day":"29",
         "month":"07",
         "year":"1999"
    })
    .expect(400)

    .end(done)

  })

  it('should reject empty gender ', (done) =>
  {
    request(app)
    .post('/artists/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "artistName":"testuser2",
      "day":"29",
         "month":"07",
         "year":"1999"
    })
    .expect(400)

    .end(done)

  })
  it('should reject empty birthdate ', (done) =>
  {
    request(app)
    .post('/artists/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "artistName":"testuser2",
      "gender":"M"
    })
    .expect(400)

    .end(done)

  })
  it('should reject artistName if it already exists', (done) =>
  {
    artist.find().then((a)=>{
      request(app)
      .post(`/artists/signup`)
      .send({
        "artistName":a[a.length-1].artistName,
        "gender":"M",
        "email":"sw.project.verify@gmail.com",
        "password":"1234",
        "day":"29",
           "month":"07",
           "year":"1999"

      })
      .expect(409)
      .end(done)

    })
  });

  it('should reject email if it already exists', (done) =>
  {
    artist.find().then((a)=>{
      request(app)
      .post(`/artists/signup`)
      .send({
        "email":a[a.length-1].email,
        "gender":"M",
        "artistName":"testuser",
        "day":"29",
           "month":"07",
           "year":"1999",
        "password":"1234"
      })
      .expect(409)
      .end(done)

    })
  });

  it('should reject invalid date ', (done) =>
  {
    request(app)
    .post('/artists/signup')
    .send({
      "email":"sw.project.verify@gmail.com",
      "password":"1234",
      "artistName":"testuser2",
      "gender":"M",
      "day":"29",
         "month":"invalid",
         "year":"1999"
    })
    .expect(400)

    .end(done)

  })

  it('should reject invalid email', (done) =>
  {
    artist.find().then((a)=>{
      request(app)
      .post(`/artists/signup`)
      .send({
        "artistName":"testuser",
        "gender":"M",
        "email":"invalid",
        "password":"1234",
        "day":"29",
           "month":"07",
           "year":"1999"

      })
      .expect(409)
      .end(done)

    })

  });

})


describe('GET /artists/confirm/:code', () => {

  it('should activate existing artist with a valid token', (done) =>
  {
      artist.find().then((a)=>{
          a[a.length-1].generateAuthToken().then((token)=>{
      request(app)
      .get(`/artists/confirm/`+token)
      .expect(200)
      .end(done)
      })
  })
  });


    it('should reject invalid token', (done) =>
    {
         request(app)
        .get(`/users/confirm/invalid`)
        .expect(401)
        .end(done)
        })

    it('should reject user whose id does not exist', (done) =>
    {
      var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZkZTVmNGE2N2EwZGJjMDU4Y2I0MDYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg0MzAwMDEyfQ.bq9qS5Z7a992i0_MTOqfVxmPmjOObKT2YPh7oHKkQ64";
        request(app)
        .get(`/users/confirm/`+token)
        .expect(404)
        .end(done)
        })

    });
