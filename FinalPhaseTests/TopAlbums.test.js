const expect =require('expect');
const request = require('supertest')
//local imports
const app=require('./../Index');
var{album}= require("../models/album.js");
var{User}= require("../models/users.js");

describe('GET /albums/top', () => {

  it('should get top albums ', (done) =>
  {
    User.find().then((users)=>
    {
      users[users.length-1].generateAuthToken().then((token)=>
      {
            request(app)
            .get('/albums/top')
            .set('x-auth',token)
            .expect(200)
            .end(done)

    })
   })
 });

 it('should refuse empty token ', (done) =>
 {

           request(app)
           .get('/albums/top')
           .expect(403)
           .end(done)
   });

   it('should refuse invalid token ', (done) =>
   {
             request(app)
             .get('/albums/top')
             .set('x-auth',"invalid token")
             .expect(401)
             .end(done)
     });

})
