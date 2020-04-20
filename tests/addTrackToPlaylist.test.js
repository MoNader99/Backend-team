const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');
const app=require('./../Index');
//const{app}=require("./../Controllers/TracksController")
const{User}=require("./../models/users")

const {track}=require("./../models/track")
var{playlist}= require("./../models/playlists.js"); 

describe('Post /tracks/:playlistId/playlists',()=>{

    it('should add tracks in the given playlist ',(done)=>{
        


      playlist.find().then((playlists)=>{
          var playlistId=playlists[playlists.length-1]._id.toHexString()
          var userId=playlists[playlists.length-1].userId;  //get a random playlist then find its user
          User.findById(userId).then((users)=>{
              users.generateAuthToken().then((token)=>{
                track.find().then((tracks)=>{
                    var urls=[];
                    for(var i=0;i<tracks.length;i++)
                    {
                        urls[i]=tracks[i]._id;
                    }
                      request(app)
                .post(`/tracks/${playlistId}/playlists`)
                .set('x-auth',token)
                .send({trackId:[urls[urls.length-1],urls[urls.length-2]]})
                .expect(200)
                .expect((res)=>{
                    expect( res.body.message).toBe('tracks added successfully')
              })
              .end(done)
                })
          })    
      })
    })
    })




    it('should return 401 if invalid token ',(done)=>{
        


        playlist.find().then((playlists)=>{
            var playlistId=playlists[playlists.length-1]._id.toHexString()
            var userId=playlists[playlists.length-1].userId;  //get a random playlist then find its user
            User.findById(userId).then((users)=>{
                users.generateAuthToken().then((token)=>{
                  track.find().then((tracks)=>{
                      var urls=[];
                      for(var i=0;i<tracks.length;i++)
                      {
                          urls[i]=tracks[i]._id;
                      }
                        request(app)
                  .post(`/tracks/${playlistId}/playlists`)
                  .set('x-auth',token+1)   //invalid token
                  .send({trackId:[urls[urls.length-1],urls[urls.length-2]]})
                  .expect(401)
                  .expect((res)=>{
                      expect( res.body.message).toBe('authentication failed')
                })
                .end(done)
                  })
            })    
        })
      })
      })




      it('should return 404 if invalid id',(done)=>{
        


        playlist.find().then((playlists)=>{
            var playlistId=playlists[playlists.length-1]._id.toHexString()+'gggg';
            var userId=playlists[playlists.length-1].userId;  //get a random playlist then find its user
            User.findById(userId).then((users)=>{
                users.generateAuthToken().then((token)=>{
                  track.find().then((tracks)=>{
                      var urls=[];
                      for(var i=0;i<tracks.length;i++)
                      {
                          urls[i]=tracks[i]._id;
                      }
                        request(app)
                  .post(`/tracks/${playlistId}/playlists`)
                  .set('x-auth',token)   //invalid token
                  .send({trackId:[urls[urls.length-1],urls[urls.length-2]]})
                  .expect(404)
                  .expect((res)=>{
                      expect( res.body.message).toBe('invalid id')
                })
                .end(done)
                  })
            })    
        })
      })
      })







      it('should return 404 if playlist not found ',(done)=>{
        


        playlist.find().then((playlists)=>{
            var playlistId=new ObjectID()
            var userId=playlists[playlists.length-1].userId;  //get a random playlist then find its user
            User.findById(userId).then((users)=>{
                users.generateAuthToken().then((token)=>{
                  track.find().then((tracks)=>{
                      var urls=[];
                      for(var i=0;i<tracks.length;i++)
                      {
                          urls[i]=tracks[i]._id;
                      }
                        request(app)
                  .post(`/tracks/${playlistId}/playlists`)
                  .set('x-auth',token)   //invalid token
                  .send({trackId:[urls[urls.length-1],urls[urls.length-2]]})
                  .expect(404)
                  .expect((res)=>{
                      expect( res.body.message).toBe('playlist not found')
                })
                .end(done)
                  })
            })    
        })
      })
      })
      it('should return 404 if Tracks not found ',(done)=>{
        


        playlist.find().then((playlists)=>{
            var playlistId=playlists[playlists.length-1]._id.toHexString();
            var userId=playlists[playlists.length-1].userId;  //get a random playlist then find its user
            User.findById(userId).then((users)=>{
                users.generateAuthToken().then((token)=>{
                  track.find().then((tracks)=>{
                      var urls=[];
                      for(var i=0;i<tracks.length;i++)
                      {
                          urls[i]=tracks[i]._id+'llalla';
                      }
                        request(app)
                  .post(`/tracks/${playlistId}/playlists`)
                  .set('x-auth',token)   //invalid token
                  .send({trackId:[urls[urls.length-1],urls[urls.length-2]]})
                  .expect(404)
                  .expect((res)=>{
                      expect( res.body.message).toBe('the track was not found')
                })
                .end(done)
                  })
            })    
        })
      })
      })



      it('should return 403 if urls more than 10 ',(done)=>{
        


        playlist.find().then((playlists)=>{
            var playlistId=playlists[playlists.length-1]._id.toHexString();
            var userId=playlists[playlists.length-1].userId;  //get a random playlist then find its user
            User.findById(userId).then((users)=>{
                users.generateAuthToken().then((token)=>{
                  track.find().then((tracks)=>{
                      var url=[];
                      for(var i=0;i<12;i++)
                      {
                          url[i]=tracks[1]._id;
                      }
                        request(app)
                  .post(`/tracks/${playlistId}/playlists`)
                  .set('x-auth',token)   //invalid token
                  .send({trackId:url})
                  .expect(403)
                  .expect((res)=>{
                      expect( res.body.message).toBe(' Forbidden because you crossed the limit of tracks in a playlist which is 10')
                })
                .end(done)
                  })
            })    
        })
      })
      })









  })
  
  



















//         User.find().then((users)=>{
//              var id= users[users.length-1]._id.toHexString();
//              users[users.length-1].isPremium=true;
//              users[users.length-1].save()
//              users[users.length-1].generateAuthToken().then((token)=>{

//                request(app)
//                .patch(`/users/${id}/regular`)
//                .set('x-auth',token)
//                .expect(200)
               
//                .expect((res)=>{
//                 expect( res.body.message).toBe("Your account has been changed to regular account")  
//              })
              
//              .end(done)

//              })
            

//         })




//     })

// })