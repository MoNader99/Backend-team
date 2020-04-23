const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var password = "abc";
const validator = require('validator');
var{track,tracksSchema}=require("./track.js");//track model and schema




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
        unique: true,
		validate:{
			validator: validator.isEmail,
			message: '{value} is not a valid email'
		}
    },
    password: {
        type: String,
        trim: true,
        minlength: 4,
    },
    facebookId: {
        type: String,
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
    gender: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1,
        enum: ["M", "F"],
    },
    birthDate: {
        type: Date,
        required: true,
        min: '1920-12-31',
        max: '2005-12-31'
    },
    resetToken:
     {
         type: String,
         default:undefined
    },
    imagePath: {
        type: String,
        required: true,
        default:"defaultuser.png"
    },

    likedTracks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "track"
        }
    ],
    recentlyPlyaedtracks:[tracksSchema],
    likedAlbums: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "album"
        }
    ],


    likedPlaylists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "playlist"
        }
    ],
    

});


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
    //console.log('hena');
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'secretkeyforuser').toString();
    //console.log('henahena');
    return new Promise((resolve, reject) => {
        //console.log('henahenahena');
        resolve(token);

    });
}

UserSchema.statics.findByToken = async function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token , 'secretkeyforuser');
    } catch (e) {
       return Promise.reject();
    }
    return User.findOne({
     _id:decoded._id
    });

};

UserSchema.statics.ActivateByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token , 'secretkeyforuser');
    } catch (e) {
       return Promise.reject();
    }


    return User.findOneAndUpdate(
	{
     _id:decoded._id
    },
	{
		isActive:true
	}
	);


};

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
////monica////////

UserSchema.methods.generateResetToken=function(){
    var user=this;
    var access="reset";
    var token=jwt.sign({_id:user._id.toHexString(),access},'secretkeyforuser');
    user.resetToken=token;
    console.log(token)
    return user.save().then(()=>{
        return new Promise((resolve, reject) => {
            resolve(token);

        });
    })

    }



    UserSchema.statics.checkTokenAndFind= function (token) {
        var User = this;
        var decoded;
        var t=token;
        try {
            decoded = jwt.verify(token , 'secretkeyforuser');
        } catch (e) {
           return Promise.reject();
        }
        return User.findOne({
         _id:decoded._id,

         resetToken:t

        });

    };


    UserSchema.statics.findByEmail = function (reqEmail) {
        var User = this;
        return User.findOne({email:reqEmail});
    };







    var User = mongoose.model('Users', UserSchema);



module.exports = {
    User
};
