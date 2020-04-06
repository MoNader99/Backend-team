const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("./../models/users.js"); 

describe("Get Image of a playlist",()=>{
    it("Should get the image of a playlist",(done)=>{
        User.find().then((users)=>{

            users[0].save()
            users[0].generateAuthToken().then((token)=>{
                var testPlaylistName="Classics";
                request(app)
                .get('/playlists/image')
                .set('x-auth',token)
                .set('playlistName',testPlaylistName)
                .expect(302)
                .end(done)
             })
        })
    });

    it("Should not get the image of a playlist with unauthorized access",(done)=>{
        var testToken2='invalid tokken';
        var testPlaylistName="Moraba3";
        request(app)
        .get('/playlists/image')
        .set('x-auth',testToken2)
        .set('playlistName',testPlaylistName)
        .expect(401,"Unauthorized Access")
        .end(done)
    });    


    it("Should not get the image of a playlist without passing the playlist name",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="";
                request(app)
                .get('/playlists/image')
                .set('x-auth',token)
                .set('playlistName',testPlaylistName)
                .expect(400,"Pass the playlistname to get it's image")
                .end(done)
            })
        })
     }); 
    
    
    it("Should not get the image of a playlist that doesnot belong to this user",(done)=>{
        User.find().then((users)=>{

            users[0].save()
            users[0].generateAuthToken().then((token)=>{
                var testPlaylistName="RecyleBin";
                request(app)
                .get('/playlists/image')
                .set('x-auth',token)
                .set('playlistName',testPlaylistName)
                .expect(404,"Playlist does not exist")
                .end(done)
            })
        })
    });     
})