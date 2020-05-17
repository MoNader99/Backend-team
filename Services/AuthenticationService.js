// JavaScript source code
const express = require('express');
const jwt = require('jsonwebtoken');
const fetch = require("node-fetch");
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
                    res.status(400).send("invalid access token or user token");
                }
                console.log(response.data)
                return response.json();
            })
            .then((data) => {
               // console.log(data.data.is_valid);
                //console.log(data['is_valid']);
              //  console.log(data);
                //console.log(app_id);
           // console.log(data.app_id);
                if (data.data.is_valid == true) {
                    console.log(req.userName);
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
    CheckFacebookToken
}
