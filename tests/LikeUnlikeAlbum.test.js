const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("../models/users.js");
var {album} = require("../models/album.js");
var{artist}= require("./../models/artists.js");

describe('/album/like/unlike/:id',()=>{

it('should Like or Unlike album',(done)=>{
    
     User.find().then((users)=>{
        var id= users[users.length-1]._id.toHexString();
   
        users[users.length-1].generateAuthToken().then((token)=>{
            artist.find().then((artists)=>{
            var id2 = artists[artists.length-1]._id.toHexString();
                var album1 = new album({
                    artistId:id2,
                    albumName:"Lyali",
                })
                album1.save().then((ress) => {
    
                     albumID=album1._id.toHexString();
                    
                    
                request(app)
                .post(`/album/like/unlike/${albumID}`)
                .set('x-auth',token)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        done(err)
                    }
                    album.findOneAndRemove({ _id: album1._id }, function (err) {
                        if (!err) {
             
                            done();
             
                        }
                        else {
                            done(err);
                        }
                    });
                });
             
            })  
          })
        })
})
})

it('Empty token is passed',(done)=>{
    var token = "";
    var albumID = "whatever";
    request(app)
    .post(`/album/like/unlike/${albumID}`)
    .set('x-auth',token)
    .expect(401)
    .end(done)
})
it('Invalid album ID',(done)=>{
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWMxYTRkYjQ0NmU3OTFjYmMyODY4NTUiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg5NzQ5MDMxfQ.zYRH91h426D6lg_qi90T5OvWxPL1vRLqgcRINHMeydI";
    var albumID = "whatever";
    request(app)
    .post(`/album/like/unlike/${albumID}`)
    .set('x-auth',token)
    .expect(404)
    .end(done)
})
it('Album ID does not exist',(done)=>{
    User.find().then((users)=>{
        users[users.length-1].generateAuthToken().then((token)=>{

        var albumID = "5ec19c7d004a8c2b2cbcffff";
        request(app)
        .post(`/album/like/unlike/${albumID}`)
        .set('x-auth',token)
        .expect(404)
        .end(done)

        })
})
})
it('User token is not valid',(done)=>{
    var token = "eyJfaWQiOiI1ZWMxYTRkYjQ0NmU3OTFjYmMyODY4NTUiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg5NzQ5MDMxfQ";
    album.find().then((albums)=>{
        var albumID = albums[albums.length-1]._id.toHexString();
        request(app)
        .post(`/album/like/unlike/${albumID}`)
        .set('x-auth',token)
        .expect(401)
        .end(done)

        })
})



})

