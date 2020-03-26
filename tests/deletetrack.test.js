const expect =require('expect');
const request = require('supertest')

const {app}= require("./../Services/deletetrack.js");
//var{track}=require("./../models/track.js"); //tracks model
//var{artist}= require("./../models/Artists.js");  

//TOKEN HAS TO BE MANUALLY SET AFTER CREATING THE DATABASE IN EACH TEST

describe("Delete a single track",()=>{
  var testToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdhNjkxYzgyYTIxZTI0MTQ3OGMyYTciLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1MDgwNjA4fQ.TZvrymUsOZYWMDQw20fmN9XGmifTiaTspv6en45AibI";
    it("Should delete a single track",(done)=>{
        
        var testTrackName="Superlife";
        request(app)
          .delete('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
        })  
          .expect(200,"Track "+testTrackName+" was deleted succsesfully")    
          .end(done)  
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
       
        var testTrackName;
        request(app)
          .delete('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
        })  
          .expect(400,"Pass the track name to delete")    
          .end(done)  
    });    


    it("Should not delete a single track if the track does not belong to this artist",(done)=>{
       
        var testTrackName="Hello";
        request(app)
          .delete('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
        })  
          .expect(404,"Track not found to be deleted")    
          .end(done)  
    });        
    
    
})