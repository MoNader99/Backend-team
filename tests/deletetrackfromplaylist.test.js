const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("./../Controllers/PlaylistController.js");
var{User}= require("./../models/users.js"); 
var{playlist}= require("./../models/playlists.js"); 
var{track}=require("./../models/track.js");

//TRACK ID AND TOKEN HAS TO BE MANUALLY SET AFTER CREATING THE DATABASE IN EACH TEST

describe("Delete a single track from a playlist",()=>{
    var testToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdhNmVkM2JkZDZkNDY4NDhjMjdjOGEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1MDgyMDczfQ.NUn44gK8NuWM6Reqm6OwC8jnED9owl72Zy0_QfyXTGA';
    it("Should delete a middle track in the playlist and re-order it",(done)=>{
       
        var testPlaylistName="Moraba3";
        var testTackId="5e776b83cca58cb00494bb88"
        request(app)
        .delete('/playlists/tracks')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            trackId:testTackId
 
        }) 
        .expect(200,"Track is successfully deleted from playlist")
        .end(done)
        
 
     });   


    it("Should delete the last track in the playlist",(done)=>{
       
        var testPlaylistName="Moraba3";
        var testTackId="5e776b83cca58cb00494bb8c"
        request(app)
        .delete('/playlists/tracks')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            trackId:testTackId
 
        }) 
        .expect(200,"Track is successfully deleted from playlist")
        .end(done)
        
 
     });
     
    it("Should not delete a track from a  playlist with an unauthorized token ",(done)=>{
        var testToken2='Unauthorized Token';
        var testPlaylistName="Moraba323";
        var testTackId="5e776b83cca58cb00494bb88"
        request(app)
        .delete('/playlists/tracks')
        .set('x-auth',testToken2)
        .send({
            playlistName:testPlaylistName,
            trackId:testTackId
 
        }) 
        .expect(401,"Unauthorized Access")
        .end(done)
        
 
    }); 

    it("Should not  delete a track from a  playlist without passing a playlist name",(done)=>{
       
        var testPlaylistName;
        var testTackId="5e776b83cca58cb00494bb8c"
        request(app)
        .delete('/playlists/tracks')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            trackId:testTackId
 
        }) 
        .expect(400,"Pass the playlistname that you want to delete a track from")
        .end(done)
        
 
     });  
     
     it("Should not  delete a track from a  playlist without passing a track id",(done)=>{
       
        var testPlaylistName="Moraba323";
        var testTackId;
        request(app)
        .delete('/playlists/tracks')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            trackId:testTackId
 
        }) 
        .expect(400,"Pass the track id that you want to delete")
        .end(done)
        
 
     });  
     
     
    it("Should not  delete a track from a  playlist with an invalid track id",(done)=>{
        
        var testPlaylistName="Moraba323";
        var testTackId="15e776b83cca58cb00494bb8c";
        request(app)
        .delete('/playlists/tracks')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            trackId:testTackId
 
        }) 
        .expect(404,"Invalid Track Id")
        .end(done)
        
 
    });      

    it("Should not  delete a track from a  playlist with a playlist name that the user doesnot have",(done)=>{
       
        var testPlaylistName="RecyleBin";
        var testTackId="5e776b83cca58cb00494bb8c";
        request(app)
        .delete('/playlists/tracks')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            trackId:testTackId
 
        }) 
        .expect(404,"Playlist not found")
        .end(done)
        
 
    }); 
    
    it("Should not  delete a track from a  playlist if the track is not in the playlist",(done)=>{
       
        var testPlaylistName="Moraba3";
        var testTackId="5e776b83cca58cb00494bb8e";
        request(app)
        .delete('/playlists/tracks')
        .set('x-auth',testToken)
        .send({
            playlistName:testPlaylistName,
            trackId:testTackId
 
        }) 
        .expect(400,"Track is not in the playlist")
        .end(done)
        
 
    });
})