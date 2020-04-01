// JavaScript source code
const express = require('express');
const jwt = require('jsonwebtoken');
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
        req.token = decodedtoken;
        req.usertype = "artist"
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
    AuthenticateFrontend
}
