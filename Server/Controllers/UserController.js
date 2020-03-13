// JavaScript source code
var { mongoose } = require("./../db/mongoose.js");
//var User = './../models/users.js';
//var User = './models/users.js';
var {User} = require("./../models/users.js");
var bodyparser = require('body-parser');
var express = require('express');
var app = express();
const bcrypt = require('bcryptjs');
var password = "abc";
app.use(bodyparser.json());
var _ = require('lodash');
/*bcrypt.compare((resolve, reject) => {
    bcrypt.compare("dkfje", "ejfekwf", (err, res) => {
        if (res) {
            console.log("feh3ade");
            resolve(user);
        } else {
            console.log("Passwordincorrect");
            reject();
        }
    });
})*/
var userservices = require("./../Services/UserServices.js");
app.post('/users/login', (req, res) => {
    console.log(1);
    var body = _.pick(req.body, ['email', 'password']);
    console.log(2);
    User.findByCredentials(body.email, body.password).then((user) => {
        console.log(3);
        return user.generateAuthToken().then((token) => {
            console.log(4);
            res.header('x-auth', token).send(user);
            console.log(5);
    });
    }).catch((e) => {
        console.log(e);
        res.status(400).send();
    });
    //res.send(body)
    
   

});
app.listen(3000);