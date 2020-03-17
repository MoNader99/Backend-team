const express = require('express');
var { mongoose } = require("../db/mongoose.js");
var { artist } = require("../models/artists.js");
var { User } = require("../models/users.js");
var _ = require('lodash');
var bodyparser = require('body-parser');
const bcrypt = require('bcrypt');

const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const app = express();


app.use(bodyparser.json());

app.listen(3000, () => { console.log('started on port 3000'); });

app.get('/Artists/:id', (req, res) => {
    var token = req.header('x-auth');
    try{
        jwt.verify(token, 'secretkeyforuser')
    }
    catch {
        console.log(error);
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
app.post('/Artists/login', (req, res) => {
    console.log("email");
    console.log(req.body.email);
    var body = _.pick(req.body, ['email', 'password']);
    console.log(2);
    artist.findByCredentials(body.email, body.password).then((artist) => {
        console.log(3);
        return artist.generateAuthToken().then((token) => {
            console.log(4);
            res.header('x-auth', token).send(artist);
            console.log(5);
        });
    }).catch((e) => {
        console.log(e);
        res.status(400).send();
    });

});
    app.post('/Artists/signup', async (req, res) => {
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
            // console.log('2et3amal');
            newacc.save().then((doc) => {
                // console.log("skod");

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