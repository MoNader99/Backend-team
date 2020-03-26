const expect =require('expect');
const request = require('supertest')//.agent(app.listen());

const {app}= require("./../Services/addtrack.js");
var{track}=require("./../models/track.js"); //tracks model
var{artist}= require("./../models/Artists.js");  //artists model and schema
var{images}= require("./../models/images.js"); // images model





describe("Add a Single Track",()=>{
    
    it('Should create a new Track',(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage = new images({
            url:"This is the test image ",
            height:224,
            width:110,
        }); 
        var testTrackName = "Superlife";
        var testDuration= 64000;
        var testGenre="RPG";
        var testTrackurl="this is the test track url"
        
        request(app)
          .post('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
            duration: testDuration,
            image:{
                 url: testImage.url,
                 height: testImage.height,
                 width: testImage.width
            },
            url: testTrackurl,
            genre:testGenre
          })
          .expect(201)
          .expect((res)=>{
              expect(res.body.trackName).toBe(testTrackName)
              expect(res.body.url).toBe(testTrackurl)
              expect(res.body.duration).toBe(testDuration)
              //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
            })
            .end((err,res)=>{
              if(err){
                   done(err)
              }
                track.findOne({$and:[{url:testTrackurl},{trackName:testTrackName }]}).then((found)=>{
                  expect(found.url).toBe(testTrackurl);  //AS THE TRACK URL IS UNIQUE THIS EXPECT IS ENOUGH
                  done();
              }).catch((e)=>done(e));
            });
          })
       })
})

    it('Should create a new Track but does not add a new image',(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage = new images({
            url:"This is the test image ",
            height:224,
            width:110,
        }); 
        var testTrackName = "RockStar";
        var testDuration= 64000;
        var testGenre="RPG";
        var testTrackurl="this is the test track url1234"
        
        request(app)
          .post('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
            duration: testDuration,
            image:{
                 url: testImage.url,
                 height: testImage.height,
                 width: testImage.width
            },
            url: testTrackurl,
            genre:testGenre
          })
          .expect(201)
          .expect((res)=>{
              expect(res.body.trackName).toBe(testTrackName)
              expect(res.body.url).toBe(testTrackurl)
              expect(res.body.duration).toBe(testDuration)
              //image cannot be compared as it is another object ro it will have an id attribute which will make conflict
            })
            .end((err,res)=>{
              if(err){
                   done(err)
              }
                track.findOne({$and:[{url:testTrackurl},{trackName:testTrackName }]}).then((found)=>{
                  expect(found.url).toBe(testTrackurl);  //AS THE TRACK URL IS UNIQUE THIS EXPECT IS ENOUGH
                  done();
              }).catch((e)=>done(e));
            });
          })
       })
      


  })


    it('Should not create a new Track with missing or incorrect Authorization token',(done)=>{

      var testToken2="Any wrong auth token";
      var testImage = new images({
          url:"This is the test image2 ",
          height:224,
          width:110,
      }); 
      var testTrackName = "Superlife1.0";
      var testDuration= 65000;
      var testTrackurl="this is the test track url 2"
      var testGenre="RPG";
      
      request(app)
        .post('/tracks')
        .set('x-auth',testToken2)
        .send({
          trackName: testTrackName,
          duration: testDuration,
          image:{
            url: testImage.url,
            height: testImage.height,
            width: testImage.width
       },
          url: testTrackurl,
          genre:testGenre,
        })
        .expect(401,"Unauthorized Access")
        .end(done);
      })
    it('Should not create a new Track with missing track Name',(done)=>{

      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage = new images({
            url:"This is the test image3 ",
            height:224,
            width:110,
        }); 
        var testTrackName;
        var testDuration= 65000;
        var testTrackurl="this is the test track url 3";
        var testGenre="RPG";
          
        request(app)
         .post('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
            duration: testDuration,
            image:{
              url: testImage.url,
              height: testImage.height,
              width: testImage.width
         },
            url: testTrackurl,
            genre:testGenre,
          })
          .expect(400,"Track name is required")
          .end(done)
          })
       })
      })


      it('Should not create a new Track with missing track genre',(done)=>{
        artist.find().then((users)=>{
          users[users.length-1].save()
          users[users.length-1].generateAuthToken().then((testToken)=>{
            var testImage = new images({
              url:"This is the test image3 ",
              height:224,
              width:110,
          }); 
          var testTrackName="Superlife23";
          var testDuration= 65000;
          var testTrackurl="this is the test track url 3";
          var testGenre;
            
          request(app)
           .post('/tracks')
            .set('x-auth',testToken)
            .send({
              trackName: testTrackName,
              duration: testDuration,
              image:{
                url: testImage.url,
                height: testImage.height,
                width: testImage.width
           },
              url: testTrackurl,
              genre:testGenre,
            })
            .expect(400,"Track genre is required")
            .end(done)
            })
         })
        })
  

    it('Should not create a new Track with missing track image',(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage ;
          var testTrackName="Superlife4.0";
          var testDuration= 65000;
          var testTrackurl="this is the test track url 4";
          var testGenre="RPG";
              
          request(app)
            .post('/tracks')
            .set('x-auth',testToken)
            .send({
              trackName: testTrackName,
              duration: testDuration,
              image:testImage,
              url: testTrackurl,
              genre:testGenre,
            })
            .expect(400,"Track image is required")
          .end(done)
          })
       })
      })
    it('Should not create a new Track with missing track url',(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage = new images({
            url:"This is the test image4",
            height:224,
            width:110,
          }); 
        var testTrackName="Superlife44";
        var testDuration= 65000;
        var testTrackurl;
        var testGenre="RPG";
              
        request(app)
          .post('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
            duration: testDuration,
            image:{
              url: testImage.url,
              height: testImage.height,
              width: testImage.width
          },
            url: testTrackurl,
            genre:testGenre,
          })
          .expect(400,"Track url is required")
          .end(done)
          })
       })
      })

    it('Should not create a new Track with missing track duration',(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage = new images({
            url:"This is the test image4",
            height:224,
            width:110,
          }); 
        var testTrackName="Superlife44";
        var testDuration;
        var testTrackurl="test tesst track url";
        var testGenre="RPG";
                
        request(app)
          .post('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
            duration: testDuration,
            image:{
              url: testImage.url,
              height: testImage.height,
              width: testImage.width
          },
            url: testTrackurl,
            genre:testGenre,
          })
          .expect(400,"Track duration is required")
          .end(done)
          })
       })
      
    })

    it('Should not create a new Track with missing image information',(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage = new images({
          url:"",
          height:224,
          width:110,
        }); 
      var testTrackName="Superlife441";
      var testDuration=64000;
      var testTrackurl="test tesst track url23";
      var testGenre="RPG";
                
      request(app)
        .post('/tracks')
        .set('x-auth',testToken)
        .send({
          trackName: testTrackName,
          duration: testDuration,
          image:{
            url: testImage.url,
            height: testImage.height,
            width: testImage.width
        },
          url: testTrackurl,
          genre:testGenre,
        })
        .expect(400,"Image Info of track has to be provided")
          .end(done)
          })
       })
      

    })
  
    it('Should not create a new Track with the same track url of another created track',(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage = new images({
            url:"this is a test imagee",
            height:224,
            width:110,
          }); 
        var testTrackName="Superlife4241";
        var testDuration=64000;
        var testTrackurl="this is the test track url";
        var testGenre="RPG";
                    
        request(app)
          .post('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
            duration: testDuration,
            image:{
              url: testImage.url,
              height: testImage.height,
              width: testImage.width
          },
            url: testTrackurl,
            genre:testGenre,
          })
          .expect(409,"This track is already created")
          .end(done)
          })
       })
      })  

    it('Should not create a new Track with the same track name for the same artist',(done)=>{
      artist.find().then((users)=>{
        users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((testToken)=>{
          var testImage = new images({
            url:"this is a test imagee2",
            height:224,
            width:110,
          }); 
        var testTrackName="Superlife";
        var testDuration=64000;
        var testTrackurl="this is the test trad2ck url12123434";
        var testGenre="RPG";
                      
        request(app)
          .post('/tracks')
          .set('x-auth',testToken)
          .send({
            trackName: testTrackName,
            duration: testDuration,
            image:{
              url: testImage.url,
              height: testImage.height,
              width: testImage.width
          },
            url: testTrackurl,
            genre:testGenre,
          })
          .expect(409,"Cannot create 2 Tracks with the same name ("+testTrackName+") for the same artist")
          .end(done)
          })
       })
      

    })                        
});


