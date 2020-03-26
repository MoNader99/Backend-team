const expect =require('expect');
const request = require('supertest')
//local
const {app}= require("./../Services/deletetrack.js");
var{artist}= require("./../models/Artists.js");  

describe("Delete a single track",()=>{
  
    it("Should delete a single track",(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testTrackName="RockStar";
              request(app)
                .delete('/tracks')
                .set('x-auth',testToken)
                .send({
                  trackName: testTrackName,
              })  
                .expect(200,"Track "+testTrackName+" was deleted succsesfully")
          .end(done)
          })
       })
      
    });

    it("Should not delete a single track with incorrect token",(done)=>{
        var testToken2="incorrect token";
        var testTrackName="Superlife123";
        request(app)
          .delete('/tracks')
          .set('x-auth',testToken2)
          .send({
            trackName: testTrackName,
        })  
          .expect(401,"Unauthorized Access")    
          .end(done)  
    });  

    it("Should not delete a single track with missing track name",(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testTrackName;
              request(app)
                .delete('/tracks')
                .set('x-auth',testToken)
                .send({
                  trackName: testTrackName,
              })  
                .expect(400,"Pass the track name to delete")
          .end(done)
          })
       })
      

    });    


    it("Should not delete a single track if the track does not belong to this artist",(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testTrackName="Hello";
              request(app)
                .delete('/tracks')
                .set('x-auth',testToken)
                .send({
                  trackName: testTrackName,
              })  
                .expect(404,"Track not found to be deleted")
          .end(done)
          })
       })
      });        
    })