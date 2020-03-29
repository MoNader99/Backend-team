const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{User}= require("./../models/users.js"); 


describe('Create a new playlist',()=>{
   it('Should create a new playlist with a default image',(done)=>{

        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba3";
                var testPrivacy=true;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                }) 
                .expect(201)
                .expect((res)=>{
                    expect(res.body.playlistName).toBe(testPlaylistName)
                    expect
                })
             .end(done)
        })
    })


    }); 


     it('Should create a new playlist without providing privacy',(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba323";
                var testPrivacy;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                }) 
                .expect(201)
                .expect((res)=>{
                    expect(res.body.playlistName).toBe(testPlaylistName)
                    
                })  
                .end(done)
             })
            })
         });  
         
         
         
         
    it('Should not create a new playlist with invalid token',(done)=>{
        var testToken2='This is an invalid token';
        var testPlaylistName="Moraba322";
        var testPrivacy=true;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken2)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
        }) 
        .expect(401,'Unauthorized Access')
        .end(done)
 
 
    });   
    
   

    it('Should not create a new playlist without a playlist name',(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName;
                var testPrivacy=true;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,

                }) 
                .expect(400,'Playlist must have a name')
                .end(done)
             })
            })
         }); 
    
    it('Should not create a new playlist with the same name of an exisiting playlist for the same user',(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba3";
                var testPrivacy=true;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                }) 
                .expect(400,"Cannot create 2 playlists with the same name")
                .end(done)
             })
            })
        });      
   }) 
    

