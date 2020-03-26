const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("./../Controllers/PlaylistController.js");
var{images}= require("./../models/images.js"); // images model
var{User}= require("./../models/users.js"); 


describe('Create a new playlist',()=>{
   it('Should create a new playlist and add the new image to the images collection',(done)=>{

        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba3";
                var testImage = new images({
                 url:"This is the test image of the playlist ",
                 height:224,
                 width:110,
             });
                var testPrivacy=true;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                    image:testImage,
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

    it('Should create a new playlist and doesnot add an image (image is already saved)',(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba32";
                var testImage = new images({
                 url:"This is the test image of the playlist ",
                 height:224,
                 width:110,
             });
                var testPrivacy=true;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                    image:testImage,
                }) 
                .expect(201)
                .expect((res)=>{
                    expect(res.body.playlistName).toBe(testPlaylistName)
                    expect(res.body.privacy).toBe(testPrivacy)
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
                var testImage = new images({
                 url:"This is the test image of the playlist ko ko ",
                 height:224,
                 width:110,
             });
                var testPrivacy;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                    image:testImage,
                }) 
                .expect(201)
                .expect((res)=>{
                    expect(res.body.playlistName).toBe(testPlaylistName)
                    
                })  
                .end(done)
             })
            })
         });  
     
    it('Should create a new playlist without providing an Image',(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba3213";
                var testImage=undefined;
                var testPrivacy=false;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                    image:testImage,
                }) 
                .expect(201)
                .expect((res)=>{
                    expect(res.body.playlistName).toBe(testPlaylistName)
                    expect(res.body.privacy).toBe(testPrivacy)
                }) 
                .end(done)
             })
            })
        });  

    it('Should create a new playlist without providing an Image and privacy',(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName="Moraba3213ma2";
                var testImage=undefined;
                var testPrivacy;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                    image:testImage,
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
        var testImage = new images({
         url:"This is the test image of the playlist1 ",
         height:224,
         width:110,
     });
        var testPrivacy=true;
        request(app)
        .post('/playlists')
        .set('x-auth',testToken2)
        .send({
            playlistName:testPlaylistName,
            privacy:testPrivacy,
            image:testImage,
        }) 
        .expect(401,'Unauthorized Access')
        .end(done)
 
 
    });   
    
   

    it('Should not create a new playlist without a playlist name',(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testPlaylistName;
                var testImage = new images({
                 url:"This is the test image of the playlist ko ",
                 height:224,
                 width:110,
             });
                var testPrivacy=true;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                    image:testImage,
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
                var testImage = new images({
                 url:"This is the test image of the playlist ko mana ",
                 height:224,
                 width:110,
             });
                var testPrivacy=true;
                request(app)
                .post('/playlists')
                .set('x-auth',token)
                .send({
                    playlistName:testPlaylistName,
                    privacy:testPrivacy,
                    image:testImage,
                }) 
                .expect(400,"Cannot create 2 playlists with the same name")
                .end(done)
             })
            })
        });      
   }) 
    

