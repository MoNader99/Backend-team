const expect = require('expect');
const request = require('supertest')//.agent(app.listen());
const { ObjectID } = require('mongodb');
const app = require('./../Index');
//const{app}=require("./../Controllers/TracksController")
//const {track}=require("./../Controllers/TracksController"); //tracks model
const { artist } = require("./../models/artists");

var testToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68s';
var wrongToken = 'eyJhbGciOiJIUzI1NiJ9.QXV0aG9yaXphdGlvbmZvcmZyb250ZW5k.xEs1jjiOlwnDr4BbIvnqdphOmQTpkuUlTgJbAtQM68';
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
            .set('x-auth', wrongToken)
            .expect(401)
            .expect((res) => {
 
                expect(res.error.text).toBe("Token is not valid");
            })
            .end(done)
    })



});






