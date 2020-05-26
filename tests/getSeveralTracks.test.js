const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');
const app=require('./../Index');
//const{app}=require("./../Controllers/TracksController")
//const {track}=require("./../Controllers/TracksController"); //tracks model
const {track}=require("./../models/track")
console.log('mmmmmmmm')


// describe('post /tracks',()=>{


// it('should return array of tracks with the given ids',(done)=>{

//      track.find().then((tracks)=>{

//         var id=[];

//           for(var i=0;i<tracks.length;i++)
//           {
//               id.push(tracks[i]._id.toHexString())
//           }
      
//         //console.log(id)
//         var test=JSON.stringify( tracks)
//         request(app)
//         .post('/tracks')
//         .send({id})
//         .expect(200)
//         .expect((res)=>{
//            expect(JSON.stringify( res.body.tracks)).toEqual(test)  
//         })
//         .end(done)
//           })

//     })


// it ('should return 404 if track was not found',(done)=>{




//     track.find().then((tracks)=>{

//         var id=[];

//           for(var i=0;i<tracks.length;i++)
//           {
//               id.push(tracks[i]._id.toHexString())
//           }
//           id.push(new ObjectID())
//      request(app)
//      .post(`/tracks`)
//      .send({id})
//      .expect(404)
//      .expect((res)=>{
//         expect( res.body.message).toBe("can not find track")
//      })
//      .end(done)
//     })
//       });




//       it ('should return 404 in case of invalid id',(done)=>{

//           request(app)
//           .post('/tracks')
//           .send({id:"1234"})
//           .expect(404)
//           .expect((res)=>{
//             expect( res.body.message).toBe("invalid id")
//           })
//           .end(done)
//            });

//            it ('should return 403 in case of more than 50 ids',(done)=>{


//             var id=[];

//             for(var i=0;i<55;i++)
//             {
//                 id.push(new ObjectID())
//             }
//             request(app)
//             .post('/tracks')
//             .send({id})
//             .expect(403)
//             .expect((res)=>{
//                expect( res.body.message).toBe(" Forbidden maximum 50 Ids")
//             })
//             .end(done)
//              });
  

// })







