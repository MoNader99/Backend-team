const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("./../Controllers/PlaylistController.js");
var{images}= require("./../models/images.js"); // images model
var{User}= require("./../models/users.js"); 
var{playlist}= require("./../models/playlists.js"); 


//TOKEN HAS TO BE MANUALLY SET AFTER CREATING THE DATABASE IN EACH TEST
describe("Delete a playlist",()=>{
    var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdhNmVkM2JkZDZkNDY4NDhjMjdjOGEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1MDgyMDczfQ.NUn44gK8NuWM6Reqm6OwC8jnED9owl72Zy0_QfyXTGA';
    it("Should delete a playlist",(done)=>{
      
       var testPlaylistName="Moraba32";
       request(app)
       .delete('/playlists')
       .set('x-auth',testToken)
       .send({
           playlistName:testPlaylistName,

       }) 
       .expect(200,"Playlist deleted succsesfully")
       .end(done)
       

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
       
        var testPlaylistName;
        request(app)
        .delete('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
 
        }) 
        .expect(400,"Pass the playlistname to delete")
        .end(done)
        
 
     })

     it("Should not delete playlist that does not exist",(done)=>{
        
        var testPlaylistName="Playlist that is not created";
        request(app)
        .delete('/playlists')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
 
        }) 
        .expect(404,"No playlist found to delete")
        .end(done)
        
 
     })     
})