// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
var bodyparser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyparser.json());
var _ = require('lodash');
//var rand=Math.floor((Math.random() * 100) + 54); //random confirmation code

const jwt = require('jsonwebtoken');

/*var { album } = require("../models/album.js");
var { artist } = require("../models/artists.js");
const { track } = require("./../models/track");*/
const trackservices = require("./../Services/TrackServices");
const artistservices = require("./../Services/ArtistServices");
const albumservices = require("./../Services/AlbumServices");
var AuthenticationServices = require("./../Services/AuthenticationService");
//{ $regex: "s", $options: "i" }
//,AuthenticationServices.AuthenticateAllUsers
app.get('/Search', (req, res) => {
            var wordtosearch = req.query.word;
            console.log(wordtosearch);
            //Return array of tracks
            artistservices.SearchInArtists(wordtosearch).then((Artists) => {
                albumservices.SearchInAlbums(wordtosearch).then((Albums) => {
                    trackservices.SearchInTracks(wordtosearch).then((Tracks) => {
                        console.log("fkdsffdfkdlsfksl");
                        res.send({ artists: Artists, Albums: Albums, Tracks: Tracks });
                    }).catch((err) => { res.status(400).send(err) })
                }).catch((err) => { res.status(400).send(err) })

            }).catch((err) => { res.status(400).send(err) })
     
  
    })   
// Get User Profile Request
/*app.get('/Search', (req, res) => {
    var token = req.header('x-auth');
    try {
        jwt.verify(token, 'secretkeyforuser')

        var wordtosearch = req.query.word;
        console.log(wordtosearch);
        //Return array of tracks
        artistservices.SearchInArtists(wordtosearch).then((Artists) => {
            albumservices.SearchInAlbums(wordtosearch).then((Albums) => {
                trackservices.SearchInTracks(wordtosearch).then((Tracks) => {
                    console.log("fkdsffdfkdlsfksl");
                    res.send({ artists: Artists, Albums: Albums, Tracks: Tracks });
                }).catch((err) => { res.status(404).send(err) })
            }).catch((err) => { res.status(404).send(err) })

        }).catch((err) => { res.status(404).send(err) })
    }s
    catch (error) {
        console.log("enta hena ezayyyy");
        try {
            console.log("da5a5aalapd");
            jwt.verify(token, 'secretkeyforartist')
            var wordtosearch = req.query.word;
            console.log(wordtosearch);
            //Return array of tracks
            artistservices.SearchInArtists(wordtosearch).then((Artists) => {
                albumservices.SearchInAlbums(wordtosearch).then((Albums) => {
                    trackservices.SearchInTracks(wordtosearch).then((Tracks) => {
                        console.log("fkdsffdfkdlsfksl");
                        res.send({ artists: Artists, Albums: Albums, Tracks: Tracks });
                    }).catch((err) => { res.status(400).send(err) })
                }).catch((err) => { res.status(400).send(err) })

            }).catch((err) => { res.status(400).send(err) })
        }
        catch (err) {
            console.log(err);
            return res.status(401).send("Token is not valid");
        }
    } 
    })   */

 /* *//* try {
        console.log({ artists: artistservices.SearchInArtists(wordtosearch), albums: albumservices.SearchInAlbums(wordtosearch), tracks: trackservices.SearchInTracks(wordtosearch) });
        res.send("")
    }
    catch (err) { res.status(404).send(err) }
    console.log("taba3");
    
   // res.send("dlfksdl");
  /*  track.find({ trackName: wordtosearch }).then((err, tracks) => {
        console.log(tracks);
        var trackids = tracks.map(function (value) { return value._id });
        res.status(200).send(tracksids);

    }).catch((err) => {
        console.log(err);
        res.status(404).send(err);

    })*/



    if(!module.parent){
        app.listen(3000,()=>{
            console.log("Started on port 3000");
        });
    }
    module.exports={app};
