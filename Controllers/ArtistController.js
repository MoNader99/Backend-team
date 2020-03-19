const express = require('express');
var { mongoose } = require("../db/mongoose.js");
var { artist } = require("../models/artists.js");
var { User } = require("../models/users.js");
var _ = require('lodash');
var bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");

const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const app = express();


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sw.project.verify@gmail.com",
        pass: "abcd-1234"
    }
});


app.use(bodyparser.json());

app.listen(3000, () => { console.log('started on port 3000'); });

app.get('/artists/:id', (req, res) => {
    var token = req.header('x-auth');
    try{
        jwt.verify(token, 'secretkeyforuser')
    }
    catch(error) {
        console.log("enta hena ezayyyy");
        return res.status(404).send("Not authorized"); 
    }

    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("invalid id");
    }

    artist.findById(id).then((artist) => {
        if (!artist) { return res.status(404).send("can not find artist"); }
        res.send({ artist })

    }).catch((e) => res.status(400).send());

});
app.post('/artists/login', (req, res) => {
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
        res.status(400).send();
    });

});



 
app.post('/artists/signup', async (req, res) => {
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


app.get('/artists/confirm/:code',(req,res) => {
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

