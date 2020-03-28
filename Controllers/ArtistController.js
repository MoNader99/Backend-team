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


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sw.project.verify@gmail.com",
        pass: "abcd-1234"
    }
});


//app.use(bodyparser.json());

//app.listen(3000, () => { console.log('started on port 3000'); });

router.get('/artists/:id', AuthenticationServices.AuthenticateAllUsers, (req, res) => {
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


router.post('/artists/login', (req, res) => {
    console.log("email");
    console.log(req.body.email);
    var body = _.pick(req.body, ['email', 'password']);
    console.log(2);
	
	
		artist.findByCredentials(body.email, body.password).then((artist) => {
        console.log(3);
		if(artist.isActive==true)
	{
        return artist.generateAuthToken().then((token) => {
            console.log(4);
            res.header('x-auth', token).send(artist);
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
    try {
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(req.body.password, salt);
      
        var newacc = new artist(
            {
               artistName: req.body.artistName,
               email: req.body.email,
               password: hashedPass,
               about: req.body.about,

            });
        console.log('2et3amal');
        newacc.save().then((doc) => {
            console.log("skod");
	
	
		
		var access= 'auth';		
		var code = jwt.sign({ _id: newacc._id.toHexString(), access }, 'secretkeyforartist',{expiresIn:'1d'});
		console.log(code);
		
		var host=req.get('host');
		var link="http://"+req.get('host')+"/artists/confirm/"+code;
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

            res.status(200).send("Artist added Successfully as inActive. Waiting for Email Confirmation ");
        },
            (err) => {
                console.log(err);
                res.status(409).send("artistName and/or Email already exists ");

            })

    }

    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
        
    }
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
 * @api {get} /api/artists Get several Artists
 * @apiName GetSeveralArtists
 * @apiGroup Artists
 *
 * @apiHeader {string}  x-auth          Authorization Required. A valid access token.
 * 
 * @apiParam {string[]}        ids array of each Artist's unique ID.
 *
 * @apiSuccess {Artist[]}          artists An array of Artist objects containing the full details of each  Artist.
 * 
 * @apiSuccessExample {JSON} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     [
    {
        "artistName": "HAmo Beeka",
        "genres": [
            "sha3by",
            "R&B"
        ],
        "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter \nwho has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
        "rating": -1
    },
    {
        "artistName": "Adele",
        "genres": [
            "pop",
            "R&B"
        ],
        "about": "Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter \n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\n      commercial success unsurpassed among her peers.",
        "rating": 4
    },
    {
        "artistName": "Eminem",
        "genres": [
            "Trap",
            "Jazz",
            "pop",
            "Rap"
        ],
        "about": "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer, \n     record executive and actor. He is one of the most successful musical artists of the 21st century.",
        "rating": 4.6
    }
]
}
 * @apiError ArtistNotFound The id of the Artist was not found.
 *
 * @apiErrorExample {string} AuthError-Response:
 *     HTTP/1.1 401  Not Found
 *     {
 *       "authentication failed"
 *     }
 *     
 *     @apiError Exceeded 5o ids 
 *
 * @apiErrorExample {string}      BadRequest-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "maximum 50 ids"
 *     }
 * 
 *     @apiError invalid id
 *
 * @apiErrorExample {string}       forbidden-Response:
 *     HTTP/1.1 403 forbidden
 *     {
 *       "invalid id"
 *     }
 * 
 * 
 * 
 */


router.get('/artists',async (req,res)=>{

    var flag=1
    var token=req.header('x-auth');

    User.findByToken(token).then(async(user)=>{

        if(!user) { 
            console.log('eeee');
             flag=0
            Promise.reject("authenticaton failed");
            //return res.status(401).send('authentication failed')
     };

     var arr=req.body.id;
  
    var returnedArtistArray=[{}];

    if(arr.length>50) {return  res.status(400).send("maximum 50 Ids only")}

    for(var i=0;i<arr.length;i++)
    {
    if(!ObjectID.isValid(arr[i]))
    {
        return res.status(403).send("invalid id");
    }

    await artist.findById(req.body.id[i]).then((artists)=>
    {
       if(!artists)//{return res.status(404).send("can not find artist");}
       {
         

       } 
       
       returnedArtistArray[i]= _.pick(artists, ['artistName', 'genres','about','rating']);;
    }).catch((e)=>res.status(400).send(e));


    }
res.send(returnedArtistArray);

      }).catch((e)=>{
        
        return res.status(401).send("authentication failed")
    })

})




module.exports= router;
