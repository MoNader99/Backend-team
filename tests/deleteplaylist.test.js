const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("./../models/users.js"); 


describe("Delete a playlist",()=>{
   it("Should delete a playlist",(done)=>{
        User.find().then((users)=>{

            users[0].save()
            users[0].generateAuthToken().then((token)=>{
                var testPlaylistName="Dejavu";
                request(app)
                .delete('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
         
                }) 
                .expect(200,"Playlist deleted succsesfully")
        
             .end(done)
        })
        })
    })
    it("Should not delete playlist without the correct authorization token",(done)=>{
        var testToken2='worng token';
        var testPlaylistName="Moraba3123";
        request(app)
        .delete('/playlists')
        .set('x-auth',testToken2)
        .send({
            playlistName:testPlaylistName,
 
        }) 
        .expect(401,"Unauthorized Access")
        .end(done)
        
 
     })

     it("Should not delete playlist without the playlist name",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName;
                request(app)
                .delete('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
         
                }) 
                .expect(400,"Pass the playlistname to delete")
                .end(done)
        })
        })
    })

     it("Should not delete playlist that does not existfor the user",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Playlist that is not created";
                request(app)
                .delete('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
         
                }) 
                .expect(404,"No playlist found to delete")
                .end(done)
        })
    })
  })     
})