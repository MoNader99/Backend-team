const expect =require('expect');
const request = require('supertest')
//local imports
const {app}= require("./../Controllers/UserController.js");
var{User}= require("./../models/users.js"); 
const myArtist=require("./../atristseeds").Newartist._doc;
console.log(myArtist._id._bsontype);
console.log(myArtist._id.toString());



describe("Get artists playing the same genre as the sent artist",()=>{
   
    it("Should get an array of artists",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testArtistId=myArtist._id.toString();
        
                request(app)
                .get('/artists/related')
                .set('x-auth',token)
                .send({
                    artistId:"5e7cfca7ad614dcc54106152"/*testArtistId*/, 
                }) 
                .expect(302)
                .end(done)
             })
        })
     });

    it("Should not get an array of artists with missing artist ID",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testArtistId;
                request(app)
                .get('/artists/related')
                .set('x-auth',token)
                .send({
                    artistId:testArtistId,
                }) 
                .expect(400,"Send the artist ID")
                .end(done)
             })
        })
     });   
    
    it("Should not get an array of artists invalid token",(done)=>{
        var testToken2="any invalid test token";
        var testArtistId=myArtist._id;

        request(app)
        .get('/artists/related')
        .set('x-auth',testToken2)
        .send({
            artistId:testArtistId,
        }) 
        .expect(401,"Unauthorized Access")
        .end(done)

    });  
    
    it("Should not get an array of artists with invalid artist ID",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testArtistId="125e776b83cca58cb00494bb84";
        
                request(app)
                .get('/artists/related')
                .set('x-auth',token)
                .send({
                    artistId:testArtistId,
                }) 
                .expect(404,"Invalid Id")
                .end(done)
             })
        })
    }); 
    
    it("Should not get an array of artists with a valid artist ID that doesnot exist",(done)=>{
        User.find().then((users)=>{

            users[users.length-1].save()
            users[users.length-1].generateAuthToken().then((token)=>{
                var testArtistId="5e776b83cca68cb00494bb99";
        
                request(app)
                .get('/artists/related')
                .set('x-auth',token)
                .send({
                    artistId:testArtistId,
                }) 
                .expect(404,"Id not found")
                .end(done)
             })
        })
    }); 

});