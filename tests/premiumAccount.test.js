const expect =require('expect');
const request = require('supertest')//.agent(app.listen());
const {ObjectID}=require('mongodb');
const jwt = require('jsonwebtoken');

const app=require('./../Index')
//const{app}=require("./../Controllers/UserController")
//const {User}=require("./../Controllers/UserController")
const{User}=require('./../models/users')

describe('Get /users/premium',()=>{

    it('should send an email to the user to confirm changing to premium ',(done)=>{
        User.find().then((users)=>{
             var id= users[users.length-1]._id.toHexString();
             users[users.length-1].isPremium=false;
             users[users.length-1].save()
            
             users[users.length-1].generateAuthToken().then((token)=>{

               request(app)
               .get(`/users/premium`)
               .set('x-auth',token)
               .expect(200)
               
               .expect((res)=>{
                expect( res.body.message).toBe("confirmation request has been sent, You will be a premium user soon")  
             })
              
             .end(done)

             })
            

        })

    })



it('should return 200 if he is already premium',(done)=>{   //this test succeeds if the user we are testing on has the property of isPremium=true
                                                            //so i change it for the user i am going to test on but i can not change it back
                                                             
        User.find().then((users)=>{
        var id= users[users.length-2]._id.toHexString();

        users[users.length-2].isPremium=true;
         users[users.length-2].save()
        users[users.length-2].generateAuthToken().then((token)=>{
        
         
            request(app)
            .get(`/users/premium`)
            .set('x-auth',token)
            .expect(200)
            
            .expect((res)=>{
             expect( res.body.message).toBe("you are already a premium user, thanks for that")  
          })
        
          .end(done)

        })
       
    })
   })


// it('should return 401 if authentication failed',(done)=>{

//     User.find().then((users)=>{
//         var id= users[users.length-1]._id.toHexString()+1;
      
//         users[users.length-1].generateAuthToken().then((token)=>{

//             request(app)
//             .get(`/users/premium`)
//             .set('x-auth',token)
//             .expect(401)
            
//             .expect((res)=>{
//            expect( res.body.message).toBe("authentication Failed")  
//         })   
//         .end(done)

//         })
       

//    })


// })

   it('should return 401 if authentication failed invalid token',(done)=>{

    User.find().then((users)=>{
        var id= users[users.length-1]._id.toHexString();
      
        users[users.length-1].generateAuthToken().then((token)=>{

            request(app)
            .get(`/users/premium`)
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


describe('Patch /users/confirmPremium/',()=>{

it('should confirm changing to a premium user',(done)=>{


    User.find().then((users)=>{
        var id= users[users.length-1]._id;
        var type= 'premium';		
        var code = jwt.sign({ _id:id, type }, 'secretkeyforuser',{expiresIn:'1d'});
        users[users.length-1].isPremium=false
         users[users.length-1].save()
request(app)
.patch(`/users/confirmPremium/?token=${code}`)
.expect(200)
.expect((res)=>{
    expect(res.body.message).toBe('Email confirmed successfully,Welcome To Premium Life!')
})
.end(done)
})
})

it('should give 404 if user not found',(done)=>{


    User.find().then((users)=>{
    
        var id=new ObjectID()
        var type= 'premium';		
        var code = jwt.sign({ _id:id, type }, 'secretkeyforuser',{expiresIn:'1d'});
request(app)
.patch(`/users/confirmPremium/?token=${code}`)
.expect(404)
.expect((res)=>{
    expect(res.body.message).toBe('not found')
})
.end(done)
})

})

it('should give 401 if invalid token',(done)=>{


    User.find().then((users)=>{
    
        var id= users[users.length-1]._id;
        var type= 'premium';		
        var code = jwt.sign({ _id:id, type }, 'secretkeyforuserr',{expiresIn:'1d'});
request(app)
.patch(`/users/confirmPremium/?token=${code}`)
.expect(401)
.expect((res)=>{
    expect(res.body.message).toBe('authentication failed or invalid token')
})
.end(done)
})

})




})