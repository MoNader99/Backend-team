
const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("./../models/users.js"); 
var{playlist}= require("./../models/playlists.js"); // playlists model
const {ObjectID}=require('mongodb');
var playlistId;
var id2=1;




// describe('/playlists/:playlistId/like/unlike/me',()=>{


//     afterEach(() => {
//         playlist.findOneAndRemove({_id:ObjectID( playlistId)}).then((res)=>{console.log(" ")});
//     playlist.findOneAndRemove({_id:ObjectID(id2)}).then((res)=>{console.log(" ")});
        
//        })

// it('should give 200 if user liked or unliked a playlist',(done)=>{


//     User.find().then((users)=>{
//         var id= users[users.length-1]._id.toHexString();
   
//         users[users.length-1].generateAuthToken().then((token)=>{

//             var playlist1 = new playlist({
//                 userId:id,
//                 playlistName:"sha3by",
//                 privacy:false,
            
//             });

//             playlist1.save().then((ress) => {

//                  playlistId=playlist1._id.toHexString();
//                 //console.log(playlistId);
                
//             request(app)
//             .post(`/playlists/${playlistId}/like/unlike/me`)
//             .set('x-auth',token)
//             .expect(200)
             
//           })
          
//           .end(done)
//          // playlist.deleteOne({_id:ObjectID( playlistId)});
         
//           })
//          // console.log("hahahahha");
  
            



//         })



// })

// })






describe('/playlists/:playlistId/like/unlike/me',()=>{

    afterEach(() => {
        playlist.findOneAndRemove({_id:ObjectID( playlistId)}).then((res)=>{console.log(" ")});
    playlist.findOneAndRemove({_id:ObjectID(id2)}).then((res)=>{console.log(" ")});
        
       })

it('should give 200 if user liked or unliked a playlist',(done)=>{
    
     User.find().then((users)=>{
        var id= users[users.length-1]._id.toHexString();
   
        users[users.length-1].generateAuthToken().then((token)=>{

            var playlist1 = new playlist({
                userId:id,
                playlistName:"sha3by",
                privacy:false,
            
            });

            playlist1.save().then((ress) => {

                 playlistId=playlist1._id.toHexString();
                //console.log(playlistId);
                
            request(app)
            .post(`/playlists/${playlistId}/like/unlike/me`)
            .set('x-auth',token)
            .expect(200)
            
        //     .expect((res)=>{
        //      expect( res.body.message).toBe("playlist name changed successfully")  
        //   })
          
          .end(done)
         // playlist.deleteOne({_id:ObjectID( playlistId)});
         
          })
         // console.log("hahahahha");
  
            



        })



})

})



it('should give 400 if user tried to like a private playlits',(done)=>{
    
    User.find().then((users)=>{
       var id= users[users.length-1]._id.toHexString();
  
       users[users.length-1].generateAuthToken().then((token)=>{

           var playlist1 = new playlist({
               userId:id,
               playlistName:"sha3by",
               privacy:true,
           
           });

           playlist1.save().then((ress) => {

                playlistId=playlist1._id.toHexString();
               //console.log(playlistId);
               
           request(app)
           .post(`/playlists/${playlistId}/like/unlike/me`)
           .set('x-auth',token)
           .expect(400)
           
           .expect((res)=>{
            expect( res.body.message).toBe("forbidden you can not like a private playlist")  
         })
         
         .end(done)
        // playlist.deleteOne({_id:ObjectID( playlistId)});
        
         })
        // console.log("hahahahha");
 
           



       })



})

})







it('should give 404 if playlist not found',(done)=>{
    
    User.find().then((users)=>{
       var id= users[users.length-1]._id.toHexString();
  
       users[users.length-1].generateAuthToken().then((token)=>{

           var playlist1 = new playlist({
               userId:id,
               playlistName:"sha3by",
               privacy:false,
           
           });

           playlist1.save().then((ress) => {

                playlistId=playlist1._id.toHexString();
               //console.log(playlistId);
               
           request(app)
           .post(`/playlists/${new ObjectID()}/like/unlike/me`)
           .set('x-auth',token)
           .expect(404)
           
           .expect((res)=>{
            expect( res.body.message).toBe("playlist not found")  
         })
         
         .end(done)
        // playlist.deleteOne({_id:ObjectID( playlistId)});
        
         })
        // console.log("hahahahha");
 
           



       })



})

})

it('should give 401 if user is not authenticated',(done)=>{
    
    User.find().then((users)=>{
       var id= users[users.length-1]._id.toHexString();
  
       users[users.length-1].generateAuthToken().then((token)=>{

           var playlist1 = new playlist({
               userId:id,
               playlistName:"sha3by",
               privacy:false,
           
           });

           playlist1.save().then((ress) => {

                playlistId=playlist1._id.toHexString();
               //console.log(playlistId);
               
           request(app)
           .post(`/playlists/${playlistId}/like/unlike/me`)
           .set('x-auth',token+'hddsfh')
           .expect(401)
           
           .expect((res)=>{
            expect( res.body.message).toBe("authentication failed")  
         })
         
         .end(done)
        // playlist.deleteOne({_id:ObjectID( playlistId)});
        
         })
        // console.log("hahahahha");
 
           



       })



})

})


it('should give 404 if invalid id',(done)=>{
    
    User.find().then((users)=>{
       var id= users[users.length-1]._id.toHexString();
  
       users[users.length-1].generateAuthToken().then((token)=>{

           var playlist1 = new playlist({
               userId:id,
               playlistName:"sha3by",
               privacy:false,
           
           });

           playlist1.save().then((ress) => {

                playlistId=playlist1._id.toHexString();
               //console.log(playlistId);
               
           request(app)
           .post(`/playlists/1234/like/unlike/me`)
           .set('x-auth',token)
           .expect(404)
           
           .expect((res)=>{
            expect( res.body.message).toBe("Invalid id")  
         })
         
         .end(done)
        // playlist.deleteOne({_id:ObjectID( playlistId)});
        
         })
        // console.log("hahahahha");
 
           



       })



})

})











})

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
