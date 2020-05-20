
const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("./../models/users.js");
const {track}=require("./../models/track") 
const {ObjectID}=require('mongodb');

describe('/tracks/:trackId/download',()=>{



    it('should return 200 and download track',(done)=>{
        var state ;
             User.find().then((users)=>{
                var id= users[users.length-1]._id.toHexString();
           
                state=users[users.length-1].isPremium;
                users[users.length-1].isPremium=true;
                users[users.length-1].markModified('isPremium');
                users[users.length-1].save();

               
                users[users.length-1].generateAuthToken().then((token)=>{
        

                    track.find().then((reqTrack)=>{

                   var reqtrackId=reqTrack[0]._id.toHexString();
                    console.log(reqtrackId)
        
                    
                    request(app)
                    .get(`/tracks/${reqtrackId}/download`)
                    .set('x-auth',token)
                    .expect(200)
                    .expect((res)=>{
                                    
                                 
                        users[users.length-1].isPremium=state;
                        users[users.length-1].markModified('isPremium');
                        users[users.length-1].save();  
                    
                         })
                
                  
                  .end(done)
                 
                  })
               
        
                })
        
                })
        
        
        
        })
        

        it('should return 400 if the user is not premium',(done)=>{
    var state ;
            User.find().then((users)=>{
               var id= users[users.length-1]._id.toHexString();
          
               state=users[users.length-1].isPremium;
               users[users.length-1].isPremium=false;
               users[users.length-1].markModified('isPremium');
               users[users.length-1].save();

              
               users[users.length-1].generateAuthToken().then((token)=>{
       

                   track.find().then((reqTrack)=>{

                  var reqtrackId=reqTrack[0]._id.toHexString();
                   console.log(reqtrackId)
       
                   
                   request(app)
                   .get(`/tracks/${reqtrackId}/download`)
                   .set('x-auth',token)
                   .expect(400)
                   .expect((res)=>{
                    expect( res.body.message).toBe("you are not premium") 
                                
               users[users.length-1].isPremium=state;
               users[users.length-1].markModified('isPremium');
               users[users.length-1].save();  
                   
                        })
               
                 
                 .end(done)
                
                 })
              
       
               })
       
               })

    })







       
    
               
    it('should return 404 if track not found',(done)=>{
        var state ;
                User.find().then((users)=>{
                   var id= users[users.length-1]._id.toHexString();
              
                   state=users[users.length-1].isPremium;
                   users[users.length-1].isPremium=true;
                   users[users.length-1].markModified('isPremium');
                   users[users.length-1].save();
    
                  
                   users[users.length-1].generateAuthToken().then((token)=>{
           
    
                       track.find().then((reqTrack)=>{
    
                      var reqtrackId=reqTrack[0]._id.toHexString();
                       console.log(reqtrackId)
           
                       
                       request(app)
                       .get(`/tracks/${new ObjectID()}/download`)
                       .set('x-auth',token)
                       .expect(404)
                       .expect((res)=>{
                        expect( res.body.message).toBe("track not found") 
                                    
                   users[users.length-1].isPremium=state;
                   users[users.length-1].markModified('isPremium');
                   users[users.length-1].save();  
                       
                            })
                   
                     
                     .end(done)
                    
                     })
                  
           
                   })
           
                   })
           
           
   
   })







       
    
               
   it('should return 401 if user is not authenticated',(done)=>{
    var state ;
            User.find().then((users)=>{
               var id= users[users.length-1]._id.toHexString();
          
               state=users[users.length-1].isPremium;
               users[users.length-1].isPremium=true;
               users[users.length-1].markModified('isPremium');
               users[users.length-1].save();

              
               users[users.length-1].generateAuthToken().then((token)=>{
       

                   track.find().then((reqTrack)=>{

                  var reqtrackId=reqTrack[0]._id.toHexString();
                   console.log(reqtrackId)
       
                   
                   request(app)
                   .get(`/tracks/${reqtrackId}/download`)
                   .set('x-auth',token+"sdfsd")
                   .expect(401)
                   .expect((res)=>{
                    expect( res.body.message).toBe("authentication failed") 
                                
               users[users.length-1].isPremium=state;
               users[users.length-1].markModified('isPremium');
               users[users.length-1].save();  
                   
                        })
               
                 
                 .end(done)
                
                 })
              
       
               })
       
               })
       
       

})

        })








// describe('/playlists/:playlistId/edit',()=>{

//     afterEach(() => {
//         playlist.findOneAndRemove({_id:ObjectID( playlistId)}).then((res)=>{console.log(" ")});
//     playlist.findOneAndRemove({_id:ObjectID(id2)}).then((res)=>{console.log(" ")});
        
//        })

// it('should change the name of the playlist',(done)=>{
    
//      User.find().then((users)=>{
//         var id= users[users.length-1]._id.toHexString();
   
//         users[users.length-1].generateAuthToken().then((token)=>{

//             var playlist1 = new playlist({
//                 userId:id,
//                 playlistName:"sha3by",
//                 privacy:true,
            
//             });

//             playlist1.save().then((ress) => {

//                  playlistId=playlist1._id.toHexString();
//                 //console.log(playlistId);
                
//             request(app)
//             .post(`/playlists/${playlistId}/edit`)
//             .set('x-auth',token)
//             .send({	"playlistName":"favsx"})
//             .expect(200)
            
//             .expect((res)=>{
//              expect( res.body.message).toBe("playlist name changed successfully")  
//           })
          
//           .end(done)
//          // playlist.deleteOne({_id:ObjectID( playlistId)});
         
//           })
//          // console.log("hahahahha");
  
            



//         })



// })

// })



// it('should give 401 if the user is not authenticated',(done)=>{
    
//     User.find().then((users)=>{
//        var id= users[users.length-1]._id.toHexString();
  
//        users[users.length-1].generateAuthToken().then((token)=>{

//            var playlist1 = new playlist({
//                userId:id,
//                playlistName:"sha3by",
//                privacy:true,
           
//            });

//            playlist1.save().then((ress) => {

//                 playlistId=playlist1._id.toHexString();
//                //console.log(playlistId);
               
//            request(app)
//            .post(`/playlists/${playlistId}/edit`)
//            .set('x-auth',token+"fdf")
//            .send({	"playlistName":"favsx"})
//            .expect(401)
           
//            .expect((res)=>{
//             expect( res.body.message).toBe("authentication failed")  
//          })
         
//          .end(done)
//         // playlist.deleteOne({_id:ObjectID( playlistId)});
        
//          })
//          //console.log("hahahahha");
 
           



//        })



// })

// })


// it('should give 403 if the user is not authorized',(done)=>{
    
//     User.find().then((users)=>{
//        var id= users[users.length-1]._id.toHexString();
  
//        users[users.length-2].generateAuthToken().then((token)=>{

//            var playlist1 = new playlist({
//                userId:id,
//                playlistName:"sha3by",
//                privacy:true,
           
//            });

//            playlist1.save().then((ress) => {

//                 playlistId=playlist1._id.toHexString();
//                //console.log(playlistId);
               
//            request(app)
//            .post(`/playlists/${playlistId}/edit`)
//            .set('x-auth',token)
//            .send({	"playlistName":"favsx"})
//            .expect(403)
           
//            .expect((res)=>{
//             expect( res.body.message).toBe("you are not allowed to make this request")  
//          })
         
//          .end(done)
//         // playlist.deleteOne({_id:ObjectID( playlistId)});
        
//          })
//          //console.log("hahahahha");
 
           



//        })



// })

// })
// it('should give 404 if invalid id',(done)=>{
    
//     User.find().then((users)=>{
//        var id= users[users.length-1]._id.toHexString();
  
//        users[users.length-2].generateAuthToken().then((token)=>{

//            var playlist1 = new playlist({
//                userId:id,
//                playlistName:"sha3by",
//                privacy:true,
           
//            });

//            playlist1.save().then((ress) => {

//                 playlistId=playlist1._id.toHexString();
//                //console.log(playlistId);
               
//            request(app)
//            .post(`/playlists/37483/edit`)
//            .set('x-auth',token)
//            .send({	"playlistName":"favsx"})
//            .expect(404)
           
//            .expect((res)=>{
//             expect( res.body.message).toBe("Invalid id")  
//          })
         
//          .end(done)
//         // playlist.deleteOne({_id:ObjectID( playlistId)});
        
//          })
//          //console.log("hahahahha");
 
           



//        })



// })

// })



// it('should give 404 if playlist not found',(done)=>{
    
//     User.find().then((users)=>{
//        var id= users[users.length-1]._id.toHexString();
  
//        users[users.length-2].generateAuthToken().then((token)=>{

//            var playlist1 = new playlist({
//                userId:id,
//                playlistName:"sha3by",
//                privacy:true,
           
//            });

//            playlist1.save().then((ress) => {

//                 playlistId=playlist1._id.toHexString();
//                //console.log(playlistId);
               
//            request(app)
//            .post(`/playlists/${new ObjectID()}/edit`)
//            .set('x-auth',token)
//            .send({	"playlistName":"favsx"})
//            .expect(404)
           
//            .expect((res)=>{
//             expect( res.body.message).toBe("playlist not found")  
//          })
         
//          .end(done)
//         // playlist.deleteOne({_id:ObjectID( playlistId)});
        
//          })
//          //console.log("hahahahha");
 
           



//        })



// })

// })
// it('should give 500 if dublicate names',(done)=>{

//     User.find().then((users)=>{
//        var id= users[users.length-1]._id.toHexString();
  
//        users[users.length-1].generateAuthToken().then((token)=>{

        
//         var playlist2 = new playlist({
//             userId:id,
//             playlistName:"favsx",
//             privacy:true,
        
//         });

//         playlist2.save();
//  id2=playlist2._id;

//            var playlist1 = new playlist({
//                userId:id,
//                playlistName:"sha3by",
//                privacy:true,
           
//            });

//            playlist1.save().then((ress) => {

//                 playlistId=playlist1._id.toHexString();
//                //console.log(playlistId);
               
//            request(app)
//            .post(`/playlists/${playlistId}/edit`)
//            .set('x-auth',token)
//            .send({	"playlistName":"favsx"})
//            .expect(500)
           
//            .expect((res)=>{
//             expect( res.body.message).toBe("you already have a playlist with the same name")  
//          })
         
//          .end(done)
//         // playlist.deleteOne({_id:ObjectID( playlistId)});
        
//          })
//          //console.log("hahahahha");
 
           
         


//        })



// })

// })











// })
