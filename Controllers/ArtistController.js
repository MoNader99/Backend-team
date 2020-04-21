const express = require('express');
var { mongoose } = require("../db/mongoose.js");
var { artist } = require("../models/artists.js");
var { User } = require("../models/users.js");
var _ = require('lodash');
//var bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");

const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const router = express.Router();
var AuthenticationServices = require("./../Services/AuthenticationService");

//edit image imports
var uploadImagefn=require("./../Services/ImageService.js").upLoadPhoto;
var upload=require("./../Services/ImageService.js").UploadUserPhoto;
var AuthenticateArtist= require("./../Services/ImageService.js").AuthenticateArtist;
var AssignArtistImage=require("./../Services/ImageService.js").AssignArtistImage;
//
var userservices = require("./../Services/UserServices.js");



var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sw.project.verify@gmail.com",
        pass: "abcd-1234"
    }
});


//EDIT ARTIST PROFILE PICTURE REQUEST
router.post("/artists/profilepicture",AuthenticateArtist,upload,reSizeUserImage,uploadImagefn,AssignArtistImage);
/////////////////

router.get('/artists/:id', AuthenticationServices.AuthenticateFrontend, (req, res) => {
    console.log(req.param.id);

    id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("invalid id");
    }
    else {
        artist.findById(id).then((artist) => {
            if (!artist) { return res.status(404).send("can not find artist"); }
            res.send({ artist })

        }).catch((e) => res.status(400).send(e));
    }

});


router.post('/artists/login', AuthenticationServices.AuthenticateFrontend, (req, res) => {
    console.log("email");
    console.log(req.body.email);
    var body = _.pick(req.body, ['email', 'password']);
    console.log(2);


		artist.findByCredentials(body.email, body.password).then((artist) => {
        console.log(3);
		if(artist.isActive==true)
	{
            return artist.generateAuthToken().then((token) => {
                res.header("Access-Control-Allow-Headers", "x-auth");
                res.header("Access-Control-Expose-Headers", "x-auth");
                console.log("login 2el gededa");
            console.log("da5a5aalapd");
            var decodedtoken = jwt.verify(token, 'secretkeyforartist')
            console.log(4);
            console.log(decodedtoken._id);
            res.header('x-auth', token).send();
            console.log(5);
        });
	}
	else
	{
		res.status(403).send("Please go to your inbox and click the link to activate your Email.");
	}

    }).catch((e) => {
        console.log(e);
        res.status(401).send("Either email or passwrod is incorrect");
    });

});


 //SIGNUP FOR THE ARTISTS
  /**
 * @api {post} api/artists/signup             Create a new artist
 * @apiName SignUp Request for artists
 * @apiGroup Artists
 *
 * @apiParam {String} artistName    Unique name of the artist
 * @apiParam {String} email         email of the artist
 * @apiParam {String} password      password of the artist
 * @apiParam  {Srting} about        A minimum of 100 characters that describe the artist
 *
 * @apiSuccess  (200) Artist added Successfully as inActive. Waiting for Email Confirmation
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "Artist added Successfully as inActive. Waiting for Email Confirmation "
 *     }
 * @apiError (409)  Conflict. the Artist already exists: duplicate artistName or email
 * @apiError (500) Internal Server Error
 * @apiErrorExample {string} Conflict Error-Response:
 *       "artistName and/or Email already exists "
 */

 router.post('/artists/signup', async (req, res) => {
   if(!req.body.artistName||!req.body.email||!req.body.password||!req.body.gender||!req.body.day||!req.body.month||!req.body.year)
   {
     return res.status(400).send("Missing some fields in the request body");
   }
   var birthDate=req.body.year+"-"+req.body.month+"-"+req.body.day;
   var timestamp = Date.parse(birthDate);

   if (isNaN(timestamp))
   {
       return res.status(400).send("invalid date format. use yyyy-mm-dd");
   }
   var correctDate = new Date(timestamp)

   const hashedPass=await userservices.HashPassword(req.body.password);

   artist.findOne({$or:[{artistName:req.body.artistName},{email: req.body.email}]}).then((duplicate)=>{
       if(duplicate)
       {
         return res.status(409).send("artistName and/or email already exist")
       }
       else
       {
         console.log(hashedPass);
         if(req.body.gender&&req.body.gender.toString()!="M"&&req.body.gender.toString()!="F")
         {
           return res.status(400).send("gender must be 'M' or 'F'");
         }
         var newacc = new artist(
             {
                 artistName: req.body.artistName,
                 email: req.body.email,
                 password: hashedPass,
                 gender: req.body.gender,
                 birthDate: correctDate

             });

         newacc.save().then((doc) => {
 		var access= 'auth';
 		var code = jwt.sign({ _id: newacc._id.toHexString(), access }, 'secretkeyforartist',{expiresIn:'1d'});
 		var host=req.get('host');
 		var link="http://"+req.get('host')+"/artists/confirm/"+code;
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


             res.status(200).send("artist added Successfully as inActive. Waiting for Email Confirmation ");
         },
             (err) => {
                 console.log("err");
                 res.status(409).send("UserName and/or Email already exists ");

             })
 }
 });

 });


 //CONFIRMATION OF ARTIST SIGNUP
/**
 * @api {get} api/artists/confirm/:code      SignUp Confrimation
 * @apiName SignUp Confirmed for artists
 * @apiGroup Artists
 *
 * @apiParam {String} code    artist-specific code to activate his account
 *
 * @apiSuccess  (200) artist was activated successfully
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Email confirmed successfully!"
 *     }
 * @apiError (404)  artist not found.
 * @apiError (401) Unauthorized. Recieved a corrupted code.
 *
 */

router.get('/artists/confirm/:code',(req,res) => {
   artist.ActivateByToken(req.params.code).then((activated) => {
        if(!activated){
			res.status(404).send("not found");
            return Promise.reject();
        }

		res.status(200).send("Email confirmed successfully!");
    }).catch((e) => {
        res.status(401).send();
    })
})


/**
 * @api {get} /artists Get several Artists
 * @apiName GetSeveralArtists
 * @apiGroup Artists
 *
 * @apiHeader {string}  x-auth          Authorization Required. A valid access token.
 *
 * @apiParam {string[]}   id               ids array of each Artist's unique ID.
 *
 * @apiSuccess {artists[]}               artists An array of Artist objects containing the full details of each  Artist.
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     "artists": [
        {
            "artistName": "Adele",
            "genres": [
                "pop",
                "R&B"
            ],
            "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
            "rating": 4
        },
        {
            "artistName": "HAmo Beeka",
            "genres": [
                "sha3by",
                "R&B"
            ],
            "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
            "rating": -1
        },
        {
            "artistName": "Eminem",
            "genres": [
                "Trap",
                "Jazz",
                "pop",
                "Rap"
            ],
            "about": "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,\n     record executive and actor. He is one of the most successful musical artists of the 21st century.",
            "rating": 4.6
        }
    ]
}
 * @apiError Authentication failed    The token sent didn't belong to any user.
 *
 * @apiErrorExample {json} AuthError-Response:
 *     HTTP/1.1 401  Authentication Failure
 *     {
 *        "message":"authentication failed"
 *     }
 *
 * @apiError Exceeded 5o ids
 *
 * @apiErrorExample {json}      BadRequest-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message":"maximum 50 ids"
 *     }
 *
 *     @apiError invalid id
 *
 * @apiErrorExample {json}       forbidden-Response:
 *     HTTP/1.1 403 forbidden
 *     {
 *       "message":"invalid id"
 *     }
 *
 *
 *
 */


router.post('/artists',async (req,res)=>{


    var token=req.header('x-auth');

    User.findByToken(token).then(async(user)=>{

        if(!user) {

            //Promise.reject("authenticaton failed");
            return res.status(401).json( {"message" :'authentication failed'})
     };

     var arr=req.body.id;

    var returnedArtistArray=[{}];

    if(arr.length>10) {return  res.status(400).json({"message":"maximum 10 Ids only"})}

    for(var i=0;i<arr.length;i++)
    {
    if(!ObjectID.isValid(arr[i]))
    {
        return res.status(403).json({"message":"invalid id"});
    }

    var flag=0;
    await artist.findById(req.body.id[i]).then((artists)=>
    {

       if(!artists)//return res.status(404).send("can not find artist");}
       {
          flag=1;
         return Promise.reject("artists not found")


       }

       returnedArtistArray[i]= _.pick(artists, ['artistName', 'genres','about','rating','imagePath']);;
    }).catch((e)=>res.status(404).json({"message":e}));
if(flag)
{
    break;
}
}
if(flag){return;}

res.json({"artists":returnedArtistArray});

      }).catch((e)=>{

        return res.status(401).json({"message":"authentication failed"})
    })

})








/**
 * @api {get} /artists/homepage/popular    Get popular Artists for homepage
 * @apiName GetPopularArtists
 * @apiGroup Artists

 *
 * @apiSuccess {artists[]}               artists An array of Artist objects containing the full details of each  Artist.
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "artists": [
        {
            "_id": "5e88ce838d92547020e1a652",
            "artistName": "Eminem",
            "genres": [
                "Trap",
                "Jazz",
                "pop",
                "Rap"
            ],
            "about": "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,\n     record executive and actor. He is one of the most successful musical artists of the 21st century.",
            "rating": 4.6,
            "imagePath": "./Pictures/defaultuser.png"
        },
        {
            "_id": "5e88ce838d92547020e1a650",
            "artistName": "Adele",
            "genres": [
                "pop",
                "R&B"
            ],
            "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
            "rating": 4,
            "imagePath": "./Pictures/Adele.png"
        }
    ]
}
 *
 *
 *
 */




//get popular artists for homepage

router.get('/artists/homepage/popular',async (req,res)=>{

    var returnedArtistArray=[{}];
    await artist.find({rating:{$gte:3}}).then(async(artists)=>{

        for (var i=0;i<artists.length;i++)
        {

            if(!artists[i])
            {
                continue;
            }

            returnedArtistArray[i]= _.pick(artists[i], ['_id','artistName', 'genres','about','rating','imagePath']);

        }

        res.send({"artists":returnedArtistArray});
    })


    })





module.exports= router;
