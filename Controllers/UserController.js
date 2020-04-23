require("./../Config/Config.js");

// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var nodemailer = require("nodemailer");
var { User } = require("./../models/users.js");
var{artist}= require("./../models/artists.js");  //artists model
const bcrypt = require('bcrypt');

const {ObjectID}=require("mongodb");
//var bodyparser = require('body-parser');
const express = require('express');
const router = express.Router();
//var app = express();
var password = "abc";
///////////////////////////////////////////////
//app.use(bodyparser.json());
var _ = require('lodash');
//var rand=Math.floor((Math.random() * 100) + 54); //random confirmation code
const jwt = require('jsonwebtoken');
var userservices = require("./../Services/UserServices.js");
var artistservices = require("./../Services/ArtistServices.js");


//edit user pp imports
var uploadImagefn=require("./../Services/ImageService.js").upLoadPhoto;
var upload=require("./../Services/ImageService.js").UploadUserPhoto;
var AuthenticateUser= require("./../Services/ImageService.js").AuthenticateUser;
var AssignUserImage=require("./../Services/ImageService.js").AssignUserImage;
var AuthenticationServices = require("./../Services/AuthenticationService");


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sw.project.verify@gmail.com",
        pass: "abcd-1234"
    }
});

 //Sign up user
 /**
 * @api {post} api/users/signup   Create a new user
 * @apiName SignUp Request for Users
 * @apiGroup Users
 *
 * @apiParam {String} userName      Unique name of the user
 * @apiParam {String} email         email of the user
 * @apiParam {String} password      password of the user
 * @apiParam  {Boolean} isPremium   default is false
 * @apiParam  {Boolean} isActive    default is false until the email is confirmed
 * @apiParam  {Date} birthDate      birthdate of the user
 * @apiParam  {Srting} gender       gender of the user-Limited to 'M' or 'F'
 *
 * @apiSuccess  (200) User added Successfully as inActive. Waiting for Email Confirmation
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "User added Successfully as inActive. Waiting for Email Confirmation "
 *     }
 * @apiError (409)  Conflict. the user already exists: duplicate userName or email
 * @apiError (500) Internal Server Error
 * @apiErrorExample {string} Conflict Error-Response:
 *    HTTP/1.1 409
 *       "UserName and/or Email already exists "
 *
 */



//EDIT USER PROFILE PICTURE REQUEST
router.post('/users/profilepicture',AuthenticateUser,upload,reSizeUserImage,uploadImagefn,AssignUserImage);
///////////////////////////////////////////
router.post('/users/signup', async (req, res) => {
  if(!req.body.userName||!req.body.email||!req.body.password||!req.body.gender||!req.body.day||!req.body.month||!req.body.year)
  {
    return res.status(400).send("Missing some fields in the request body");
  }
  var birthDate=req.body.year+"-"+req.body.month+"-"+req.body.day;
//  console.log(birthDate);
  var timestamp = Date.parse(birthDate);

  if (isNaN(timestamp))
  {
      return res.status(400).send("invalid date format. use yyyy-mm-dd");
  }
  var correctDate = new Date(timestamp)

  const hashedPass=await userservices.HashPassword(req.body.password);

  User.findOne({$or:[{userName:req.body.userName},{email: req.body.email}]}).then((duplicate)=>{
      if(duplicate)
      {
        return res.status(409).send("UserName and/or email already exist")
      }
      else
      {
        console.log(hashedPass);
        if(req.body.gender&&req.body.gender.toString()!="M"&&req.body.gender.toString()!="F")
        {
          return res.status(400).send("gender must be 'M' or 'F'");
        }
        var newacc = new User(
            {
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPass,
                isPremium: req.body.isPremium,
                gender: req.body.gender,
                birthDate: correctDate

            });

        newacc.save().then((doc) => {
		var access= 'auth';
		var code = jwt.sign({ _id: newacc._id.toHexString(), access }, 'secretkeyforuser',{expiresIn:'1d'});
		var host=req.get('host');
		var link="http://"+req.get('host')+"/users/confirm/"+code;
	//	console.log(link);
		var mailOptions={
			to : req.body.email,
			subject : "Please confirm your Email account",
			html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
			}

		smtpTransport.sendMail(mailOptions, function(error, response){
		 if(error){
				console.log(error);
			res.end("error");
		 }else{
			res.end("sent");
			 }

});


            res.status(200).send("User added Successfully as inActive. Waiting for Email Confirmation ");
        },
            (err) => {
                console.log(err);
                res.status(409).send("UserName and/or Email already exists ");

            })
}
});

});


//CONFIRMATION OF USER SIGNUP
/**
 * @api {get} api/users/confirm/:code      SignUp Confrimation
 * @apiName SignUp Confirmed for user
 * @apiGroup Users
 *
 * @apiParam {String} code    user-specific code to activate his account
 *
 * @apiSuccess  (200) User was activated successfully
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Email confirmed successfully!"
 *     }
 * @apiError (404)  User not found.
 * @apiError (401) Unauthorized. Recieved a corrupted code.
 *
 */

router.get('/users/confirm/:code',(req,res) => {
   User.ActivateByToken(req.params.code).then((user) => {
        if(!user){
			res.status(404).send("user not found");
            return Promise.reject();
        }

		res.status(200).send("Email confirmed successfully!");
    }).catch((e) => {
        res.status(401).send("corrupted code");
    })
})



router.post('/users/login', AuthenticationServices.AuthenticateFrontend, async (req, res) => {
    console.log(1);
    var body = _.pick(req.body, ['email', 'password']);
    console.log(2);
    User.findByCredentials(body.email, body.password).then((user) => {
        console.log(3);
        if (user.isActive == true) {
            return user.generateAuthToken().then((token) => {
                console.log(4);
                res.header("Access-Control-Allow-Headers", "x-auth");
                res.header("Access-Control-Expose-Headers", "x-auth");
                console.log("login 2el gededa");
                res.header('x-auth', token).send();
                console.log(5);
            });
        }
        else {
            res.status(403).send("Please go to your inbox and click the link to activate your Email.");
        }
    }).catch((e) => {
        console.log(e);
        res.status(401).send("Either email or passwrod is incorrect");
    });
    //res.send(body)
});
router.post('/users/loginwithfacebook', AuthenticationServices.CheckFacebookToken, (req, res) => {
    console.log("dada");
    console.log(req.body.userName);
    userservices.signUpWithFacebook(req.facebookId, req.body.userName, req.body.email, req.body.gender, req.body.bdate).then((user) => {
        console.log(user);
			return user.generateAuthToken().then((token) => {
                res.header("Access-Control-Allow-Headers" , "x-auth");
                res.header("Access-Control-Expose-Headers", "x-auth");
                res.header('x-auth', token).send();
			});
    }).catch((e) => {
        console.log(e);
        res.status(400).send("Wrong parameters in request");
    });

});
router.post('/unfollow/artist/:id', AuthenticationServices.AuthenticateUsers, async (req, res) => {
    var artistId = req.params.id;
    console.log("da5al");

    artistservices.unFollowArtist(artistId, req.userId).then((str) => {
        console.log(str);
        if (str == "unfollowed") res.status(200).send("You have un followed the artist");
        if (str == "notfound") res.status(200).send("You are not following the artist");

    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    })

});
router.post('/unfollow/user/:id', AuthenticationServices.AuthenticateUsers, async (req, res) => {
    var userId = req.params.id;
    console.log("da5al");

    userservices.unFollowUser(userId, req.userId).then((str) => {
        console.log(str);
        if (str == "unfollowed") res.status(200).send("You have un followed the user");
        if (str == "notfound") res.status(200).send("You are not following the user");

    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    })

});
// Get User Profile Request
router.get('/users/me',(req,res) => {
    var token = req.header('x-auth');
    if(!token)
    {
        res.status(401).send('Token is Empty');
    }
    User.findByToken(token).then((user) => {
        if(!user){
            res.status(401).send('User does not have access or does not exist');
        }
        res.status(302).send(user);
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
router.post('/users/forgot', async (req, res) => {

    var reqEmail=req.body.email;
    //console.log(reqEmail)
    try {

     await User.findByEmail(reqEmail).then((user)=>{

           if(!user)  {


            return res.status(404).json({"message" :"Email not found"})}

       // console.log('henaaaa')
    var rand=Math.floor((Math.random() * 100) + 54);
    user.generateResetToken().then((token)=>{
    //console.log(token);
    var host=req.get('host');
    var link="http://"+req.get('host')+"/logIn/forgotpassword/newpassword/?token= "+token;
    var mailOptions={
        to : reqEmail,
        subject : "Reset the password ",
        html : "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to verify</a>"
        }

    console.log(link);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.status(500).json({"message" :"sending failed"});
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

router.patch('/users/reset',async (req,res)=>{

    var newPassword=req.body.newPassword;
   // console.log(newPassword)
    //console.log("helloooooo");
    var token=req.query.token;

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(newPassword, salt);
   //console.log(hashedPass);
    await User.checkTokenAndFind(token).then((user)=>{

       user.password=hashedPass;
       user.resetToken=undefined;
       user.save();

       res.json({"message":"Password has been reset successfully"});

       // console.log(user);
    }).catch((e)=> {res.status(401).json({"message":'Reset Failed'});})

    })




//REGULAR ACCOUNT
/**
 * @api {patch} api/users/:id/regular    User wants to unsubscribe from premium features
 * @apiName WithdrawPremiumServies
 * @apiGroup Users
 * @apiHeader {string} x-auth          Only users
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

router.patch('/users/regular', async (req, res) => {
    var userId;
    //var id=req.params.id;
    //console.log(id);
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
    if(!user){
        return Promise.reject();
    }
  userId=user._id;
  //console.log(userId);
//   if(! (userId.toString()===id))
//   {
//       return res.status(401).json({"message":"authentication Failed"})
//   }
   if(user.isPremium===false)
  {
    return res.status(200).json({"message":"you are not premium , you already have a regular account"});

  }
else
{
    user.isPremium=false;
    user.save();
    res.status(200).json({"message":"Your account has been changed to regular account"})
    //console.log('inside the request')
    //console.log(user.isPremium);
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


router.get('/users/premium', async (req, res) =>
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
              //console.log(userId);
            //   if(! (userId.toString()===id))
            //   {
            //       return res.status(401).json({"message":"authentication Failed"})
            //   }
             if(user.isPremium===true)
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
                var link="http://"+req.get('host')+"/users/confirmPremium/?token= "+code;
                console.log(link);
                var mailOptions={
                    to : email,
                    subject : "Please confirm your Premium account",
                    html : "Hello,<br> Please Click on the link to confirm your premium account.<br><a href="+link+">Click here to verify</a>"
                    }
                //console.log(mailOptions);
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



router.patch('/users/confirmPremium/',async (req,res)=>{
     var token=req.query.token;
try{
    decoded = jwt.verify(token , 'secretkeyforuser');

    if (decoded.type==='premium')
    { User.findById(decoded._id).then((user)=>{
        if(!user){
		 return	res.status(404).json({"message":"not found"});
           // return Promise.reject();
        }

        user.isPremium=true;
        user.save()
        res.status(200).json({"message":"Email confirmed successfully,Welcome To Premium Life!"});
    }


    ).catch((e) => {
       return res.status(401).json({"message":"authentication failed"});

    })
}
else
{
    return res.status(401).json({"message":"authentication failed or invalid token"});
}

}
catch{
    res.status(401).json({"message":"authentication failed or invalid token"});

}

 })




//GET ARTIST RELATED ARTISTS
router.get('/users/artists/related' ,AuthenticationServices.AuthenticateFrontend,(req,res)=>{
    var sentId=req.header('artistId');
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
});








router.patch('/users/me/editprofile',(req, res)=>{
  var token=req.header('x-auth');
  if(!token)
  {
    return  res.status(401).send('You should Pass a token to access the profile');
  }
  else
try{
    decoded = jwt.verify(token , 'secretkeyforuser');

     User.findById(decoded._id).then((user)=>{
        if(!user)
		{
			return res.status(404).json({"message":"not found"});
        }
		if(req.body.day&&req.body.month&&req.body.year)
			{
        var birthDate=req.body.year+"-"+req.body.month+"-"+req.body.day;
				var timestamp = Date.parse(birthDate);

				if (isNaN(timestamp) == false)
				{
					var correctDate = new Date(timestamp);
				}
				else
				{
					return res.status(400).send("invalid date format. use yyyy-mm-dd");

				}

		    }
		 if(req.body.userName)
		 {
		  User.findOne({userName:req.body.userName}).then((duplicate)=>{
			if(duplicate&& duplicate._id!=decoded._id)
			{

				return res.status(409).send("UserName already exists")

			}
			else
			{

        try
		{
			if(req.body.userName)
			{

				user.userName=req.body.userName;

			}
			if(req.body.gender)
			{

				if(req.body.gender.toString()!="M"&&req.body.gender.toString()!="F")
				{

					return res.status(400).send("gender must be 'M' or 'F'");
				}


				user.gender= req.body.gender;
			}
      if(req.body.day&&req.body.month&&req.body.year)
			{

					user.birthDate=correctDate

			}

				user.save(function(err, user) {
        if (err) return res.send("invalid userName");
    });




		}
		catch(e)

		{

			return res.status(400).send(e);

		}

        return res.status(200).send("updated");
	}

		 });
		 }
    }).catch((e) => {

        return res.status(401).send("authentication failed");

    })

}
catch{

    return res.status(401).json({"message":"authentication failed or invalid token"});

}

 })





 // Change Password
 router.put('/users/changePassword',async (req,res)=>{
    var oldPassword=req.body.oldPassword;
    var newPassword=req.body.newPassword;
    if(!oldPassword)
    {
        return res.status(400).send('You did not enter your old password');
    }
    if(!newPassword)
    {
        return res.status(400).send('You did not enter your  password');
    }
    var token=req.header('x-auth');
    if(!token)
    {
        return res.status(401).send('Token is Empty')
    }
    User.findByToken(token).then((user) => {
        if(!user)
        {
            return res.status(401).send('User does not have access or does not exist');
        }
    console.log("you are my user");
    var done = 0;
    bcrypt.compare(oldPassword, user.password, async (err, res2) => {
        if(res2) {
            console.log('Your password mached with database hash password');
            console.log('lets change password');
                const salt = await bcrypt.genSalt();
                const hashedPass = await bcrypt.hash(newPassword, salt);
                console.log(hashedPass);
                user.password=hashedPass;
                user.save();
                console.log('saving user');
                done = 1;
                return res.status(200).send("Password has been changed successfully");

        } else {
            console.log(user.password);
            console.log(oldPassword);
            console.log('Your password not mached.');
            done = 0
            return res.status(403).send("Password is incorrect");
        }}).catch(e);
    }).catch(e);
});





 //if(!module.parent){
    //  app.listen(3000,()=>{
    //      console.log("Started on port 3000");
    //  });
 //}

 module.exports = router ;
