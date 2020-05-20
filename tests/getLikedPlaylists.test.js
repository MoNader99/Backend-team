
const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("./../models/users.js"); 
var{playlist}= require("./../models/playlists.js"); // playlists model
const {ObjectID}=require('mongodb');



var playlistId;


 describe('/playlists/liked/me',()=>{



    afterEach(() => {
        playlist.findOneAndRemove({_id:ObjectID( playlistId)}).then((res)=>{console.log(" ")});
        
       })
   



it('should get the liked playlists',(done)=>{
    
     User.find().then((users)=>{
        var id= users[users.length-1]._id.toHexString();
   
           len= users[users.length-1].likedPlaylists.length;     

        users[users.length-1].generateAuthToken().then((token)=>{

            var playlist1 = new playlist({
                userId:id,
                playlistName:"sha3by",
                privacy:true,
            
            });

          playlist1.save().then((res)=>{

       playlistId=playlist1._id.toHexString();
          

       users[users.length-1].likedPlaylists[len]=ObjectID(playlistId.toString());
       users[users.length-1].markModified('likedPlaylists')
       users[users.length-1].save();
       


            request(app)
            .get(`/playlists/liked/me`)
            .set('x-auth',token)
            .expect(200)
            .expect((res)=>{
             expect( res.body.likedPlaylists[len].playlistId).toBe(playlistId); 
             expect( res.body.likedPlaylists[len].playlistName).toBe(playlist1.playlistName);
             expect( res.body.likedPlaylists[len].likes).toBe(playlist1.likes);
            
             expect( res.body.likedPlaylists[len].imagePath).toBe(playlist1.imagePath);
             expect( res.body.likedPlaylists[len].privacy).toBe(playlist1.privacy);     
           

             users[users.length-1].likedPlaylists.splice(len,1);
             users[users.length-1].markModified('likedPlaylists')
             users[users.length-1].save();
        
          })
          
          .end(done)
  
  
            

        })

        })



})

})




it('should return 401 if user is not authenticated',(done)=>{
    
    User.find().then((users)=>{
       var id= users[users.length-1]._id.toHexString();
  
          len= users[users.length-1].likedPlaylists.length;     

       users[users.length-1].generateAuthToken().then((token)=>{

           var playlist1 = new playlist({
               userId:id,
               playlistName:"sha3by",
               privacy:true,
           
           });

         playlist1.save().then((res)=>{

      playlistId=playlist1._id.toHexString();
         

      users[users.length-1].likedPlaylists[len]=ObjectID(playlistId.toString());
      users[users.length-1].markModified('likedPlaylists')
      users[users.length-1].save();
      


           request(app)
           .get(`/playlists/liked/me`)
           .set('x-auth',token+"hjhj")
           .expect(401)
           .expect((res)=>{
        
            
        expect( res.body.message).toBe("authentication failed")  
                
                          
            users[users.length-1].likedPlaylists.splice(len,1);
            users[users.length-1].markModified('likedPlaylists')
            users[users.length-1].save();
       
         })
         
         .end(done)
 
 
           

       })

       })



})

})








    })// of the describe

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
