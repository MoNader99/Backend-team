const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');
const app=require('./../Index');
//const{app}=require("./../Controllers/TracksController")
//const {track}=require("./../Controllers/TracksController"); //tracks model
const {artist}=require("./../models/artists")
const{User}=require("./../models/users")
var _ = require('lodash');
console.log('mmmmmmmm')


describe('Get /artists',()=>{


it('should return array of artist objects with the given ids', (done)=>{
var id=[];
var test=[];
User.find().then((users)=>{
    users[users.length-1].generateAuthToken().then((token)=>{

       artist.find().then( (artists)=>{
            for(var i=0;i<artists.length;i++)
            { id[i]=artists[i]._id.toHexString()
             test.push(_.pick(artists[i].toJSON(),['artistName','genres','about','rating','imagePath']))
            }
           
            //console.log({id});
            //console.log(test)
            request(app)
            .post('/artists')
            .send({id})
            .set('x-auth',token)
            .expect(200)
            .expect((res)=>{
                            expect(res.body.artists).toEqual(test)  
                        })
          .end(done)


     })


    })



})



})


it('should return 401 if invalid token', (done)=>{
    var id=[];
    var test=[];
    User.find().then((users)=>{
        users[users.length-1].generateAuthToken().then((token)=>{
    
           artist.find().then( (artists)=>{
                for(var i=0;i<artists.length;i++)
                { id[i]=artists[i]._id.toHexString()
                 test.push(_.pick(artists[i].toJSON(),['artistName','genres','about','rating']))
                }
               
                //console.log({id});
                //console.log(test)
                request(app)
                .post('/artists')
                .send({id})
                .set('x-auth',token+1)
                .expect(401)
                .expect((res)=>{
                    expect(res.body.message).toBe('authentication failed')  
                            })
              .end(done)
    
    
         })
    
    
        })
    
    
    
    })
    
    
    
    })
    

    it('should return 400 if id exceeded 10', (done)=>{
        var id=[];
        var test=[];
        User.find().then((users)=>{
            users[users.length-1].generateAuthToken().then((token)=>{
        
               artist.find().then( (artists)=>{
                    for(var i=0;i<11;i++)
                    { id[i]=artists[0]._id.toHexString()
                     test.push(_.pick(artists[0].toJSON(),['artistName','genres','about','rating']))
                    }
                   
                    //console.log({id});
                    //console.log(test)
                    request(app)
                    .post('/artists')
                    .send({id})
                    .set('x-auth',token)
                    .expect(400)
                    .expect((res)=>{
                        expect(res.body.message).toBe('maximum 10 Ids only')  
                                })
                  .end(done)
        
        
             })
        
        
            })
        
        
        
        })
        
        
        
        })





        it('should return 403 if invalid ids', (done)=>{
            var id=[];
            var test=[];
            User.find().then((users)=>{
                users[users.length-1].generateAuthToken().then((token)=>{
            
                   artist.find().then( (artists)=>{
                        for(var i=0;i<artists.length;i++)
                        { id[i]=artists[i]._id.toHexString()+11;
                         test.push(_.pick(artists[i].toJSON(),['artistName','genres','about','rating']))
                        }
                       
                        //console.log({id});
                        //console.log(test)
                        request(app)
                        .post('/artists')
                        .send({id})
                        .set('x-auth',token)
                        .expect(403)
                        .expect((res)=>{
                            expect(res.body.message).toBe('invalid id')  
                                    })
                      .end(done)
            
            
                 })
            
            
                })
            
            
            
            })
            
            
            
            })
    










it('should return 404 if artist was not found', (done)=>{
    var id=[];
    var test=[];
    User.find().then((users)=>{
        users[users.length-1].generateAuthToken().then((token)=>{
    
           artist.find().then( (artists)=>{
                for(var i=0;i<artists.length;i++)
                { id[i]=new ObjectID();
                 test.push(_.pick(artists[i].toJSON(),['artistName','genres','about','rating']))
                }
               
                //console.log({id});
                //console.log(test)
                request(app)
                .post('/artists')
                .send({id})
                .set('x-auth',token)
                .expect(404)
                .expect((res)=>{
                                expect(res.body.message).toBe('artists not found')  
                            })
              .end(done)
    
    
         })
    
    
        })
    
    
    
    })
    
    
    
    })
    
    
    









})

//})

//      track.find().then((tracks)=>{

//         var id=[];

//           for(var i=0;i<tracks.length;i++)
//           {
//               id.push(tracks[i]._id.toHexString())
//           }
      
//         //console.log(id)
//         var test=JSON.stringify( tracks)
//         request(app)
//         .get('/tracks')
//         .send({id})
//         .expect(200)
//         .expect((res)=>{
//            expect(JSON.stringify( res.body)).toEqual(test)  
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
//      .get(`/tracks/${new ObjectID()}`)
//      .expect(404)
//      .expect((res)=>{
//         expect( res.body.message).toBe("Track not found")
//      })
//      .end(done)
//     })
//       });




//       it ('should return 404 in case of invalid id',(done)=>{

//           request(app)
//           .get('/tracks')
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
//             .get('/tracks')
//             .send({id})
//             .expect(403)
//             .expect((res)=>{
//                expect( res.body.message).toBe(" Forbidden maximum 50 Ids")
//             })
//             .end(done)
//              });
  

// })







