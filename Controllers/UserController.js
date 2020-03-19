

// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var nodemailer = require("nodemailer");
var { User } = require("./../models/users.js");
var bodyparser = require('body-parser');
var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
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
 * @api {post} /users/forgot      Request to send email for resetting password
 * @apiName ForgotPasswordRequest
 * @apiGroup User privacy
 * 
 * @apiHeader {json} Content-Type
 * 
 * @apiParam {string} userEmail       in json form
 * 
 * @apiSuccess {string} emailSent    The email contains a link with a token that should be passed in the resetPassword request
 *                                    
 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Email Sent Successfully"
 *     }
 *     
 * @apiError EmailCannotBeSent  A problem while sending email
  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 serverError
 *     {
 *       "Sending Failed"
 *     }   
  
  
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 505 serverError
 *     {
 *       "EmailCannotBeSent"
 *     }  
 */
app.post('/users/forgot', async (req, res) => {
    
    var reqEmail=req.body.email;
    console.log(reqEmail)
    try {

     await User.findByEmail(reqEmail).then((user)=>{

           if(!user)  {

              
            return res.status(404).send('Email not found')}

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
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            //res.send(token);
        res.end("Email Sent Successfully");
         }

        })
    })
     });
}

    catch
    {
        res.status(500).send("Sending Failed");
    }
});

/**
 * Reset password
 * ----------------------
 * @api {patch} /users/reset      Request to reset password
 * @apiName ResetRequest
 * @apiGroup User privacy
 * 
 * @apiHeader {json} Content-Type
 * 
 * @apiParam {string} Token    shoulb be passed in query
 * @apiParam {string}  newPassword   in json form
 * 
 * @apiSuccess {string}     The id the user will use to reset his
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Password has been reset successfully""
 *     }
 *     
 * @apiError EmailCannotBeSent  A problem while sending email
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 server Error
 *     {
 *       "Reset Failed""
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

       res.send("Password has been reset successfully");
       
        console.log(user);
    }).catch((e)=> {res.status(500).send('Reset Failed');})
    
    })




//REGULAR ACCOUNT
/**
 * @api {patch} api/users/:id/regular    User wants to unsubscribe from premium features
 * @apiName WithdrawPremiumServies
 * @apiGroup Users
 * @apiHeader {string} x-auth    Only users 
 * @apiParam {String} userId   the id of the user has to be passed
 * @apiSuccess (200) {string}  
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "Your account has been changed to regular account"
 *     }
 * @apiUse MissingUser
 * @apiUse ErrorUser
 * 
 * @apiError (404)  You are  not premium in the firstplace   
 * 
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 
 *     {
 *       "you are not premium , you already have a regular account "
 *     }
 * 
 * @apiError (401)  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 
 *     {
 *       ""authentication Failed" "
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
      return res.status(401).send("authentication Failed")
  }
  else if(user.isPremium===false)
  {
    return res.status(404).send("you are not premium , you already have a regular account");
      
  }
else
{
    user.isPremium=false;
    user.save();
    res.status(200).send("Your account has been changed to regular account")
}

}).catch((e)=>{return res.status(401).send("authentication Failed")}) 

});






 //REQUEST FOR A PREMIUM ACCOUNT
/**
 * @api {get} /users/:userId/premium    Send a confirmation mail to be a premium user  
 * @apiName Join Premium Request 
 * @apiGroup Users
 * @apiHeader {string} x-auth            token Only users can request to premium
 * 
 * @apiParam {String} userId             the id of the user should be passed in the path
 * 
 * @apiSuccess  (200) {string}          show him wether he is premium or not
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       
 *        "confirmation request has been sent, You will be a premium user soon"
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      
 *        "You are already a premium user.Thanks for that"
 *     }
 * 
 * 
 * @apiError (401)  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 
 *     {
 *       ""authentication Failed" "
 *     }
 * 
 * @apiError (500) EmailCannotBeSent  A problem while sending email
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 server Error
 *     {
 *       "error,failed to send"
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
                  return res.status(401).send("authentication Failed")
              }
              else if(user.isPremium===true)
              {
                return res.status(200).send("you are already a premium user, thanks for that");
                  
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
                    res.status(500).send("error,failed to send");
                 }
                 
                 else
                 {
                        console.log("Message sent: " + response.message);
                    res.status(200).send("confirmation request has been sent, You will be a premium user soon");
                }
                     
                      });
            }
            
           
        }).catch((e)=>{return res.status(401).send("authentication Failed")}) 
    })   
            
	
	
  












//CONFIRMATION OF A PREMIUM ACCOUNT
/**
 * @api {patch} /users/confirmPremium     User is confirmed to be a premium user
 * @apiName Acceptance of Premium Request
 * @apiGroup Users
 * @apiParam {String} token               the token that was sent in the link snet to the user's email 
 * @apiSuccess (200) {string} "Email confirmed successfully,Welcome To Premium Life!"  change of premium status from false to true
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
*              "Email confirmed successfully,Welcome To Premium Life!" 
 * 
 * 
 *     
 *     }
 * 
 * @apiError (401)  authentication failed
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 
 *     {
 *       ""authentication Failed" "
 *     }
 * 
 * 
 */



app.patch('/users/confirmPremium/',async (req,res)=>{
     var token=req.query.token;

    decoded = jwt.verify(token , 'secretkeyforuser');
    if (decoded.type==='premium')
    { User.findById(decoded._id).then((user)=>{
        if(!user){
			res.status(404).send("not found");
            return Promise.reject();
        }

        user.isPremium=true;
        user.save()
        res.status(200).send("Email confirmed successfully,Welcome To Premium Life!");
    }).catch((e) => {
        res.status(401).send("authentication failed");

    })
}
 
 })






























app.listen(3000,()=>{console.log('started on port 3000');});