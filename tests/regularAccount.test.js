const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');

const app=require('./../Index');
//const {User}=require("./../Controllers/UserController")
const{User}=require('./../models/users')


describe('Patch /users/:id/regular',()=>{

    it('should return the premium user to regular account ',(done)=>{
        User.find().then((users)=>{
             var id= users[users.length-1]._id.toHexString();
             users[users.length-1].isPremium=true;
             users[users.length-1].save()
             users[users.length-1].generateAuthToken().then((token)=>{

               request(app)
               .patch(`/users/regular`)
               .set('x-auth',token)
               .expect(200)
               .expect((res)=>{
                expect( res.body.message).toBe("Your account has been changed to regular account")  
             })
              
             .end(done)

             })
            

        })




    })



it('should return 200 if he is already regular',(done)=>{   //this test succeeds if the user we are testing on has the property of isPremium=fasle
                                                             
                                                         


    User.find().then((users)=>{
        var id= users[users.length-1]._id.toHexString();
        users[users.length-1].generateAuthToken().then((token)=>{

          request(app)
          .patch(`/users/regular`)
          .set('x-auth',token)
          .expect(200)
          
          .expect((res)=>{
           expect( res.body.message).toBe("you are not premium , you already have a regular account")  
        })
         
        .end(done)

        })
       

   })


})

// it('should return 401 if authentication failed invalid id',(done)=>{

//     User.find().then((users)=>{
//         var id= users[users.length-1]._id.toHexString()+1;
//         //users[users.length-1].isPremium=true;
//         //users[users.length-1].save()
//         users[users.length-1].generateAuthToken().then((token)=>{

//           request(app)
//           .patch(`/users/regular`)
//           .set('x-auth',token)
//           .expect(401)
          
//           .expect((res)=>{
//            expect( res.body.message).toBe("authentication Failed")  
//         })
         
//         .end(done)

//         })
       

//    })


// })



it('should return 401 if authentication failed invalid token',(done)=>{

    User.find().then((users)=>{
        var id= users[users.length-1]._id.toHexString();
        //users[users.length-1].isPremium=true;
        //users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((token)=>{

          request(app)
          .patch(`/users/regular`)
          .set('x-auth',token+1)
          .expect(401)
          
          .expect((res)=>{
           expect( res.body.message).toBe("authentication Failed")  
        })
         
        .end(done)

        })
       

   })


})












})

