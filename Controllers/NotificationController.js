// JavaScript source code
const express = require('express');
const _ = require('lodash');
const { mongoose } = require("./../db/mongoose.js");
var bodyParser = require('body-parser');
const multer = require("multer");
var artistServices = require("./../Services/ArtistServices");
var authenticationServices = require("./../Services/AuthenticationService.js");
var notificationServices = require("./../Services/NotificationServices.js");

const router = express.Router();


//ADD A SINGLE TRACK
router.get('/notification/artistupadtes',authenticationServices.AuthenticateUsers, (req, res) => {
    artistServices.getFollowedArtists(req.userId).then((artists) => {
        notificationServices.getArtistsNewNotifications(artists, req.userId).then((Notifications) => {
            console.log(Notifications);
            res.status(200).send(Notifications);
        }).catch((err) => {
            res.status(400).send(err);
            console.log(err);
        })
    }).catch((err) => {
        res.status(400).send(err);
        console.log(err);

    })
});
module.exports = router;
