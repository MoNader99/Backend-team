const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("./../models/users.js"); 
var{playlist}= require("./../models/playlists.js"); 

describe("Delete a single track from a playlist",()=>{
   
    it("Should delete a middle track in the playlist and re-order it",(done)=>{
        User.find().then((users)=>{
        playlist.findOne({playlistName:"X"}).then((Arr)=>{ 
            var testTackId=Arr.tracks[0];
            users[0].save()
            users[0].generateAuthToken().then((token)=>{
                var testPlaylistName="X";
               
                request(app)
                .delete('/playlists/tracks')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    trackId:testTackId
         
                }) 
                .expect(200,"Track is successfully deleted from playlist")
                .end(done)
             })
        })
    })
    });   


    it("Should delete the last track in the playlist",(done)=>{
        User.find().then((users)=>{
        playlist.findOne({playlistName:"X"}).then((Arr)=>{  
            var testTackId=Arr.tracks[Arr.tracks.length-1]  
            users[0].save()
            users[0].generateAuthToken().then((token)=>{
                var testPlaylistName="X";
                request(app)
                .delete('/playlists/tracks')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    trackId:testTackId
         
                }) 
                .expect(200,"Track is successfully deleted from playlist")
                .end(done)
             })
        })
    })
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
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName;
                var testTackId="5e776b83cca58cb00494bb8c"
                request(app)
                .delete('/playlists/tracks')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    trackId:testTackId
         
                }) 
                .expect(400,"Pass the playlistname that you want to delete a track from")
                .end(done)
             })
        })
    });  
     
     it("Should not  delete a track from a  playlist without passing a track id",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba323";
                var testTackId;
                request(app)
                .delete('/playlists/tracks')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    trackId:testTackId
         
                }) 
                .expect(400,"Pass the track id that you want to delete")
                .end(done)
             })
        })
     });  
     
     
    it("Should not  delete a track from a  playlist with an invalid track id",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba323";
                var testTackId="15e776b83cca58cb00494bb8c";
                request(app)
                .delete('/playlists/tracks')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    trackId:testTackId
         
                }) 
                .expect(404,"Invalid Track Id")
                .end(done)
             })
        })
    });      

    it("Should not  delete a track from a  playlist with a playlist name that the user doesnot have",(done)=>{
        User.find().then((users)=>{

            users[0].save()
            users[0].generateAuthToken().then((token)=>{
                var testPlaylistName="RecyleBin";
                var testTackId="5e776b83cca58cb00494bb8c";
                request(app)
                .delete('/playlists/tracks')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    trackId:testTackId
         
                }) 
                .expect(404,"Playlist not found")
                .end(done)
             })
        })
    }); 
    
    it("Should not  delete a track from a  playlist if the track is not in the playlist",(done)=>{
        User.find().then((users)=>{

            users[0].save()
            users[0].generateAuthToken().then((token)=>{
                var testPlaylistName="Classics";
                var testTackId="5e776b83cca58cb00494bb8e";
                request(app)
                .delete('/playlists/tracks')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    trackId:testTackId
         
                }) 
                .expect(400,"Track is not in the playlist")
                .end(done)
             })
        })
    });
})