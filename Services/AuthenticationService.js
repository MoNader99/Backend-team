// JavaScript source code
const express = require('express');
const multer = require('multer');
var bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");
const multiparty = require('multiparty');
const multerStorage = multer.memoryStorage();  // for image to be stored as a buffer in memory to be able to resize it before saving it in the file

const multerFilter = (req, file, cb) => {
    console.log("oorg");
    req.userName = req.body.userName;
    req.bdate = req.body.bdate;
    req.gender = req.body.gender;
    req.email = req.body.email;
    //req.file = files;
    if (file) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        }
        else {
            req.fileError = 400;
            cb(null, false);
        }
    }
};


///CONFIGURES THE DEST OF THE UPLOAD 
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
//
UploadUserPhoto = upload.single('photo');
var parseRequest = (req, res, next) => {



        let form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        //console.log();
        req.userName = fields['userName'];
        req.bdate = fields['bdate'];
        req.gender = fields['gender'];
        req.email = fields['email'];
        req.file = files;
            next();
        });
}

var CheckFacebookToken = (req, res, next) => {
    var access_token = req.header('access_token');
    var input_token = req.header('input_token');
    var url = "https://graph.facebook.com/debug_token"+"?input_token="+input_token+"&access_token="+access_token;
    var requestOptions = {
        method: 'GET',
        headers: {
            'input_token': input_token,
            'access_token': access_token
        }
    }
    console.log(access_token);

        fetch(url, requestOptions)
    //console.log(1);
            .then((response) => {
                //console.log(response);
                if (response.status==400) {
                    res.status(401).send("Facebook token is not valid");                }
                //console.log(response.data.data)

                return response.json();
            })
            .then((data) => {
               // console.log(data.data.is_valid);
                //console.log(data['is_valid']);
              //  console.log(data);
                //console.log(app_id);
           // console.log(data.app_id);
                if (data.data.is_valid == true) {
                   // console.log(req.userName);
                   // console.log("iddddddddddddddd");
                    //cosnole.log(data.data.user_id);

                    req.facebookId = data.data.user_id;
                    next();
            }
            else {
                res.status(401).send("Facebook token is not valid");
            }
            })
        .catch((err) => {
            res.status(400);
        })
};
/*    try {
        decodedtoken = jwt.verify(token, 'secretkeyforuser');
        req.token = decodedtoken;
        req.usertype = "normal user"
        next();
    }
    catch (error) {
        console.log("enta hena ezayyyy");
        try {
            console.log("da5a5aalapd");
            decodedtoken = jwt.verify(token, 'secretkeyforartist')
            req.token = decodedtoken;
            req.usertype = "artist"
            next();
        }
        catch (err) {
            res.status(401).send("Token is not valid");
        }
    }*/
//}
//}
var AuthenticateAllUsers = (req, res, next) => {
    var token = req.header('x-auth');
    console.log(req.param.id);
    try {
        decodedtoken = jwt.verify(token, 'secretkeyforuser');
        req.userId = decodedtoken._id;
        req.usertype = "normal user"
        next();
    }
    catch (error) {
        console.log("enta hena ezayyyy");
        try {
            console.log("da5a5aalapd");
            decodedtoken = jwt.verify(token, 'secretkeyforartist')
            req.userId = decodedtoken._id;
            req.usertype = "artist"
            next();
        }
        catch (err) {
            res.status(401).send("Token is not valid");
        }
    }
}
var AuthenticateArtists = (req, res, next) => {
    var token = req.header('x-auth');
    try {
        console.log("da5a5aalapd");
        var decodedtoken = jwt.verify(token, 'secretkeyforartist')
        console.log(decodedtoken._id);
        req.token = decodedtoken;
        req.usertype = "artist"
        next();
    }
    catch (err) {
        res.status(401).send("Token is not valid");
    }
}
var AuthenticateUsers = (req, res, next) => {
    var token = req.header('x-auth');
    try {
        console.log("da5a5aalapd");
        var decodedtoken = jwt.verify(token, 'secretkeyforuser')
        console.log(decodedtoken._id);
        var token = decodedtoken;
        req.userId = decodedtoken._id;
        req.usertype = "user"
        next();
    }
    catch (err) {
        res.status(401).send("Token is not valid");
    }
}

var AuthenticateFrontend = (req, res, next) => {
    var token = req.header('x-auth');
    try {
        console.log("da5a5aalapd");
        var decodedtoken = jwt.verify(token, 'secretkeyforfrontend')
        req.token = decodedtoken;
        req.usertype = "frontend"
        next();
    }
    catch (err) {
        res.status(401).send("Token is not valid");
    }
}
module.exports = {
    AuthenticateAllUsers,
    AuthenticateArtists,
    AuthenticateFrontend,
    AuthenticateUsers,
    CheckFacebookToken,
    parseRequest,
    UploadUserPhoto

}
