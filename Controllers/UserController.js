

// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var nodemailer = require("nodemailer");
var { User } = require("./../models/users.js");
var{artist}= require("./../models/Artists.js");  //artists model

const {ObjectID}=require("mongodb");
var bodyparser = require('body-parser');
var express = require('express');
var app = express();
const bcrypt = require('bcryptjs');
var password = "abc";
app.use(bodyparser.json());
var _ = require('lodash');
//var rand=Math.floor((Math.random() * 100) + 54); //random confirmation code

const jwt = require('jsonwebtoken');
var userservices = require("./../Services/UserServices.js");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sw.project.verify@gmail.com",
        pass: "abcd-1234"
    }
});


app.post('/users/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        console.log(req.body.userName)
        console.log(req.body.email)
        console.log(req.body.password)
        console.log(req.body.isPremium)
        console.log(req.body.gender)
        console.log(req.body.birthDate)
        var newacc = new User(
            {
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPass,
                isPremium: req.body.isPremium,
                gender: req.body.gender,
                birthDate: req.body.birthDate

            });
        console.log('2et3amal');
        newacc.save().then((doc) => {
            console.log("skod");
	
	
		
		var access= 'auth';		
		var code = jwt.sign({ _id: newacc._id.toHexString(), access }, 'secretkeyforuser',{expiresIn:'1d'});
		console.log(code);
		
		var host=req.get('host');
		var link="http://"+req.get('host')+"/users/confirm/?code="+code;
		console.log(link);
		var mailOptions={
			to : req.body.email,
			subject : "Please confirm your Email account",
			html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
			}
		console.log(mailOptions);
		smtpTransport.sendMail(mailOptions, function(error, response){
		 if(error){
				console.log(error);
			res.end("error");
		 }else{
				console.log("Message sent: " + response.message);
			res.end("sent");
			 }
			 
});

            res.status(200).send(hashedPass);
        },
            (err) => {
                console.log(err);
                res.status(403).send(err);

            })

    }

    catch
    {
        res.status(500).send();
    }
});



app.get('/users/confirm',(req,res) => {
   User.ActivateByToken(req.query.code).then((user) => {
        if(!user){
			res.status(404).send("not found");
            return Promise.reject();
        }
	
		res.status(200).send("Email confirmed successfully!");
    }).catch((e) => {
        res.status(401).send();
    })
})		



app.post('/users/login', async (req, res) => {
    console.log(1);
    var body = _.pick(req.body, ['email', 'password']);
    console.log(2);
    User.findByCredentials(body.email, body.password).then((user) => {
        console.log(3);
		if(user.isActive==true)
		{	
			return user.generateAuthToken().then((token) => {
            console.log(4);
            res.header('x-auth', token).send(user);
		    console.log(5);
			});
		}
		else
		{
			res.status(403).send("Please go to your inbox and click the link to activate your Email.");
		}
    }).catch((e) => {
        console.log(e);
        res.status(400).send();
    });
    //res.send(body)



});

// Get User Profile Request
app.get('/users/me',(req,res) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        res.send(user);
    }).catch((e) => {
        res.status(401).send();
    })
})






 /**
 * forgot password
 * ----------------------
 * @api {post} /users/forgot      Request to send email after forgetting password
 * @apiName ForgotPasswordRequest
 * @apiGroup User privacy
 * 
 * @apiParam {string} email       in json form
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "abc@abc.com"
 *     }
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message" :"Email Sent Successfully"
 *     }
 *     
 * @apiError  500              [Email Cannot BeSent  A problem while sending email]
  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 serverError
 *     {
 *       "message":"Sending Failed"
 *     }   
* @apiError  404       [email of the user not found ]

 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 not found
 *     {
 *        "message":"Email not found"
 *     }  
 */
app.post('/users/forgot', async (req, res) => {
    
    var reqEmail=req.body.email;
    console.log(reqEmail)
    try {

     await User.findByEmail(reqEmail).then((user)=>{

           if(!user)  {

              
            return res.status(404).json({"message" :"Email not found"})}

        console.log('henaaaa')
    var rand=Math.floor((Math.random() * 100) + 54);
    user.generateResetToken().then((token)=>{
    console.log(token);
    var host=req.get('host');
    var link="http://"+req.get('host')+"/users/reset/?token= "+token;
    var mailOptions={
        to : reqEmail,
        subject : "Reset the password ",
        html : "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to verify</a>"
        }
    
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.json({"message" :"sending failed"});
     }else{
            console.log("Message sent: " + response.message);
            //res.send(token);
        res.json({"message":"Email Sent Successfully"});
         }

        })
    })
     });
}

    catch
    {
        res.status(500).json({"message" :"Sending Failed"});
    }
});

/**
 * Reset password
 * ----------------------
 * @api {patch} /users/reset      Request to reset password
 * @apiName ResetRequest
 * @apiGroup User privacy
 * 
 * @apiParam {string} token          shoulb be passed in query
 * @apiParam {string}  newPassword    should be passed in body in json form
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "message": "Password has been reset successfully""
 *     }
 *     
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
 *       "message": "Reset Failed""
 *     }  
 */

app.patch('/users/reset',async (req,res)=>{

    var newPassword=req.body.newPassword;
    console.log(newPassword)
    console.log("helloooooo");
    var token=req.query.token;

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(newPassword, salt);
   console.log(hashedPass);
    await User.checkTokenAndFind(token).then((user)=>{

       user.password=hashedPass;
       user.resetToken=undefined;
       user.save();

       res.json({"message":"Password has been reset successfully"});
       
        console.log(user);
    }).catch((e)=> {res.status(401).json({"message":'Reset Failed'});})
    
    })




//REGULAR ACCOUNT
/**
 * @api {patch} api/users/:id/regular    User wants to unsubscribe from premium features
 * @apiName WithdrawPremiumServies
 * @apiGroup Users
 * @apiHeader {string} x-auth          Only users 
 * @apiParam {String} id          the id of the user has to be passed  
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Your account has been changed to regular account"
 *     }

 * 
 * @apiError (404)  You are  not premium in the firstplace   
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 
 *     {
 *       "message":"you are not premium , you already have a regular account "
 *     }
 * 
 * @apiError (401)  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 
 *     {
 *       "message":"authentication Failed" "
 *     }
 * 
 */

app.patch('/users/:id/regular', async (req, res) => {
    var userId;
    var id=req.params.id;
    console.log(id);
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
    if(!user){
        return Promise.reject();
    }
  userId=user._id;
  console.log(userId);
  if(! (userId.toString()===id))
  {
      return res.status(401).json({"message":"authentication Failed"})
  }
  else if(user.isPremium===false)
  {
    return res.status(404).json({"message":"you are not premium , you already have a regular account"});
      
  }
else
{
    user.isPremium=false;
    user.save();
    res.status(200).json({"message":"Your account has been changed to regular account"})
}

}).catch((e)=>{return res.status(401).json({"message":"authentication Failed"})}) 

});






 //REQUEST FOR A PREMIUM ACCOUNT
/**
 * @api {get} /users/:id/premium    Send a confirmation mail to be a premium user  
 * @apiName Join Premium Request 
 * @apiGroup Users
 * @apiHeader {string} x-auth            token Only users can request to premium
 * 
 * @apiParam {String} id             the id of the user should be passed in the path
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       
 *       "message": "confirmation request has been sent, You will be a premium user soon"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      
 *       "message": "You are already a premium user.Thanks for that"
 *     }
 * 
 * 
 * @apiError (401)  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 
 *     {
 *       "message":"authentication Failed" "
 *     }
 * 
 * @apiError 500       EmailCannotBeSent  A problem while sending email
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 server Error
 *     {
 *       "message":"error,failed to send"
 *     }  
 * 
 * 
*/


app.get('/users/:id/premium', async (req, res) => 
{
    
             var id=req.params.id;
              var userId;
             var token=req.header('x-auth');
             User.findByToken(token).then((user) => 
             {
                if(!user){
                    return Promise.reject();
                }
              userId=user._id;
              console.log(userId);
              if(! (userId.toString()===id))
              {
                  return res.status(401).json({"message":"authentication Failed"})
              }
              else if(user.isPremium===true)
              {
                return res.status(200).json({"message":"you are already a premium user, thanks for that"});
                  
              }
            else
            {
                var email= user.email;
                var type= 'premium';		
                var code = jwt.sign({ _id: user._id, type }, 'secretkeyforuser',{expiresIn:'1d'});
                console.log(code);
                
                var host=req.get('host');
                var link="http://"+req.get('host')+"/users/confirmPremium/?code= "+code;
                console.log(link);
                var mailOptions={
                    to : email,
                    subject : "Please confirm your Premium account",
                    html : "Hello,<br> Please Click on the link to confirm your premium account.<br><a href="+link+">Click here to verify</a>"
                    }
                console.log(mailOptions);
                smtpTransport.sendMail(mailOptions, function(error, response){
                 if(error) 
                 {
                        console.log(error);
                    res.status(500).json({"message":"error,failed to send"});
                 }
                 
                 else
                 {
                        console.log("Message sent: " + response.message);
                    res.status(200).json({"message":"confirmation request has been sent, You will be a premium user soon"});
                }
                     
                      });
            }
            
           
        }).catch((e)=>{return res.status(401).json({"message":"authentication Failed"})}) 
    })   
            
	
	
  












//CONFIRMATION OF A PREMIUM ACCOUNT
/**
 * @api {patch} /users/confirmPremium     User is confirmed to be a premium user
 * @apiName Acceptance of Premium Request
 * @apiGroup Users
 * @apiParam {String} token               the token that was sent in the link snet to the user's email 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
*           "message" : "Email confirmed successfully,Welcome To Premium Life!" 
 * 
 * 
 *     
 *     }
 * 
 * @apiError 401  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 
 *     {
 *       "message":"authentication Failed" "
 *     }
 * 
 
 * 
 * 
 * 
 * 
 * 
 */



app.patch('/users/confirmPremium/',async (req,res)=>{
     var token=req.query.token;
try{
    decoded = jwt.verify(token , 'secretkeyforuser');
    
    if (decoded.type==='premium')
    { User.findById(decoded._id).then((user)=>{
        if(!user){
			res.status(404).json({"message":"not found"});
            return Promise.reject();
        }

        user.isPremium=true;
        user.save()
        res.status(200).json({"message":"Email confirmed successfully,Welcome To Premium Life!"});
    }).catch((e) => {
        res.status(401).json({"message":"authentication failed"});

    })
}
}
catch{
    res.status(401).json({"message":"authentication failed or invalid token"});

}

 })




//GET ARTIST RELATED ARTISTS
app.get('/artists',(req,res)=>{
    var token = req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }

    var sentId=req.body.artistId; 
    if(!sentId){
        return res.status(400).send("Send the artist ID");
    }
    if(!ObjectID.isValid(sentId)){
        return res.status(404).send("Invalid Id");  
    }
    artist.findById(sentId).then((myartists)=>{ 
        if(!myartists){
            return res.status(404).send('Id not found');
        }
        artist.find({genres:{$in:myartists.genres}}).then((suggestedArtists)=>{    
        for(var count=0;count<suggestedArtists.length;count++)
        {
            if(suggestedArtists[count]._id==sentId){
                var switchvar=suggestedArtists[count];   
                suggestedArtists[count]=suggestedArtists[(suggestedArtists.length)-1];
                suggestedArtists[(suggestedArtists.length)-1]=switchvar;
                suggestedArtists.pop();
                break;
            }
        }
        res.status(302).send(suggestedArtists);
        },(e)=>{
            res.status(500).send("Internal Server error");
        })

    },(e)=>{
        
        res.status(500).send("Internal server error");
    })
  }).catch((e)=>{
    res.status(401).send('Unauthorized Access');
  })   
});  


























app.listen(3000,()=>{console.log('started on port 3000');});