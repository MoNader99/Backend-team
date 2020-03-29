const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');
const app=require('./../Index');
//const{app}=require("./../Controllers/TracksController")
//const {track}=require("./../Controllers/TracksController"); //tracks model
const {track}=require("./../models/track")
console.log('mmmmmmmm')


describe('Get /tracks/:id',()=>{


it('should return a track with the given id',(done)=>{

     track.find().then((tracks)=>{
        var id= tracks[0]._id.toHexString();
        
        var test=JSON.stringify( tracks[0])
        request(app)
        .get(`/tracks/${id}`)
        .expect(200)
        .expect((res)=>{
           expect(JSON.stringify( res.body.tracks)).toEqual(test)  
        })
        .end(done)
         })

    })


it ('should return 404 if track was not found',(done)=>{

     request(app)
     .get(`/tracks/${new ObjectID()}`)
     .expect(404)
     .expect((res)=>{
        expect(JSON.stringify( res.body.tracks)).toBeNull 
     })
     .end(done)
      })




      it ('should return 404 in case of invalid id',(done)=>{

          request(app)
          .get('/tracks/1234')
          .expect(404)
          .expect((res)=>{
             expect(JSON.stringify( res.body.tracks)).toBeNull 
          })
          .end(done)
           })



})







