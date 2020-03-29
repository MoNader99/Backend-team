const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');
const app=require('./../Index');
//const{app}=require("./../Controllers/UserController")
//const {User}=require("./../Controllers/UserController")
const{User}=require('./../models/users')

describe('Post /users/forgot',()=>{

    it('should send email successfully',(done)=>{
       
        var email
        User.find().then((users)=>{
            email=users[users.length-1].email;     //i chose this index because the third user has my email so that i can check
            request(app)                           //  it will work for any database but we may send the email to a real person 
            .post('/users/forgot')
            .send({email})   
            .expect(200)
            .expect((res)=>{
              expect( res.body.message).toBe("Email Sent Successfully")
           })
           .end(done)
         })
    })

      it('should return 404 if email not found in the db',(done)=>{

        request(app)
        .post('/users/forgot')
        .send({email:"bojdjksd@ymail.com"})
        .expect(404)
        .expect((res)=>{
          expect( res.body.message).toBe("Email not found")
       })
       .end(done)
      })
      
})

describe('Patch users/reset',()=>{

it ('should reset the password successfully',(done)=>{

        User.find().then((users)=>{
            var token=users[users.length-1].resetToken;     //i chose this index because the third user has my email so that i can check
                                                            //  it will work for any database but we may send the email to a real person 
            var newPassword="12345678"
            
            
            request(app)                          
            .patch(`/users/reset/?token=${token}`)
            .send({newPassword})   
            .expect(200)
            .expect((res)=>{
              expect( res.body.message).toBe("Password has been reset successfully")
           })
           .end(done)
         })

        })


         it (' should give 401 not the same token that was sent',(done)=>{

            User.find().then((users)=>{
               var token=users[users.length-2].resetToken;     //not the same user that was sent the token
                //var token=    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdhNmVkM2JkZDZkNDY4NDhjMjdjOGEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1MDgyMDczfQ.NUn44gK8NuWM6Reqm6OwC8jnED9owl72Zy0_QfyXTGA';
                                                               //another test token
                var newPassword="12345678"
                
                
                request(app)                          
                .patch(`/users/reset/?token=${token}`)
                .send({newPassword})   
                .expect(401)
                .expect((res)=>{
                  expect( res.body.message).toBe("Reset Failed")
               })
               .end(done)
             })

})
})