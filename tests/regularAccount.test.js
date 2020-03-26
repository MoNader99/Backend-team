const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');

const{app}=require("./../Controllers/UserController")
const {User}=require("./../Controllers/UserController")


describe('Patch /users/:id/regular',()=>{

    it('should return the premium user to regular account ',(done)=>{
        User.find().then((users)=>{
             var id= users[users.length-1]._id.toHexString();
             users[users.length-1].isPremium=true;
             users[users.length-1].save()
             users[users.length-1].generateAuthToken().then((token)=>{

               request(app)
               .patch(`/users/${id}/regular`)
               .set('x-auth',token)
               .expect(200)
               
               .expect((res)=>{
                expect( res.body.message).toBe("Your account has been changed to regular account")  
             })
              
             .end(done)

             })
            

        })




    })



it('should return 404 if he is already premium',(done)=>{   //this test succeeds if the user we are testing on has the property of isPremium=fasle
                                                             
                                                         


    User.find().then((users)=>{
        var id= users[users.length-1]._id.toHexString();
        users[users.length-1].generateAuthToken().then((token)=>{

          request(app)
          .patch(`/users/${id}/regular`)
          .set('x-auth',token)
          .expect(404)
          
          .expect((res)=>{
           expect( res.body.message).toBe("you are not premium , you already have a regular account")  
        })
         
        .end(done)

        })
       

   })


})

it('should return 401 if authentication failed',(done)=>{

    User.find().then((users)=>{
        var id= users[users.length-1]._id.toHexString()+1;
        //users[users.length-1].isPremium=true;
        //users[users.length-1].save()
        users[users.length-1].generateAuthToken().then((token)=>{

          request(app)
          .patch(`/users/${id}/regular`)
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


// describe('Post /users/forgot',()=>{

//     it('should send email successfully',(done)=>{
       
//         var email
//         User.find().then((users)=>{
//             email=users[users.length-1].email;     //i chose this index because the third user has my email so that i can check
//             request(app)                           //  it will work for any database but we may send the email to a real person 
//             .post('/users/forgot')
//             .send({email})   
//             .expect(200)
//             .expect((res)=>{
//               expect( res.body.message).toBe("Email Sent Successfully")
//            })
//            .end(done)
//          })
//     })

//       it('should return 404 if email not found in the db',(done)=>{

//         request(app)
//         .post('/users/forgot')
//         .send({email:"bojdjksd@ymail.com"})
//         .expect(404)
//         .expect((res)=>{
//           expect( res.body.message).toBe("Email not found")
//        })
//        .end(done)
//       })
      
// })

// describe('Patch users/reset',()=>{

// it ('should reset the password successfully',(done)=>{

//         User.find().then((users)=>{
//             var token=users[users.length-1].resetToken;     //i chose this index because the third user has my email so that i can check
//                                                             //  it will work for any database but we may send the email to a real person 
//             var newPassword="12345678"
            
            
//             request(app)                          
//             .patch(`/users/reset/?token=${token}`)
//             .send({newPassword})   
//             .expect(200)
//             .expect((res)=>{
//               expect( res.body.message).toBe("Password has been reset successfully")
//            })
//            .end(done)
//          })

//         })


//          it (' should give 401 not the same token that was sent',(done)=>{

//             User.find().then((users)=>{
//                var token=users[users.length-2].resetToken;     //not the same user that was sent the token
//                 //var token=    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdhNmVkM2JkZDZkNDY4NDhjMjdjOGEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1MDgyMDczfQ.NUn44gK8NuWM6Reqm6OwC8jnED9owl72Zy0_QfyXTGA';
//                                                                //another test token
//                 var newPassword="12345678"
                
                
//                 request(app)                          
//                 .patch(`/users/reset/?token=${token}`)
//                 .send({newPassword})   
//                 .expect(401)
//                 .expect((res)=>{
//                   expect( res.body.message).toBe("Reset Failed")
//                })
//                .end(done)
//              })

// })
// })