var mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var password = "abc";

var UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true

    },

    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }

}
);

UserSchema.statics.findByCredentials = function (email, password) {
    console.log("2elgedeed");
    var User = this;
    console.log("2elgedeed2");
    return User.findOne({ email }).then((user) => {
        console.log("2elgedeed3");
        if (!user) {
            console.log("not user");
            return Promise.reject();

        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    console.log("feh3ade");
                    resolve(user);
                } else {
                    console.log("Passwordincorrect");
                    reject();
                }
            });
        })
    });

};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    console.log('hena');
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'secretkeyforuser').toString();
    console.log('henahena');
    return new Promise((resolve, reject) => {
        console.log('henahenahena');
        resolve(token);

    });
}

User = mongoose.model('users', UserSchema);
/*bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
        var user1 = new User({
            email: "ayamahmoudabdelfatah99@gmail.com",
            password: hash,
            userName: "hamadaaa  ",
            country: "  Egypt"
        });
        user1.save().then((res) => {
            console.log(res._id);
        }, (err) => {
            console.log(err);
        });

    });
});*/

module.exports = {
    User
};
