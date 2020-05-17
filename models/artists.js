var mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const password = "2032";
const jwt = require('jsonwebtoken');
const validator = require('validator');

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
})
var ArtistSchema = new mongoose.Schema({
    artistName: {
        type:String,
        required:true,
        minlength : 1 ,
        trim : true,
        unique:true
    },
    email:{
        type:String,
        //required:true,
        trim:true,
        minlength:1,
        unique : true,
        validate:{
          validator: validator.isEmail,
          message: '{value} is not a valid email'
        }
    },
    password:{
    type:String,
    //required:true,
    trim:true,
    minlength:4,
    },
    about:{
        type:String,
    //    required:true,
        trim:true,
        minlength:100
    },
    genres:[String],
    rating:{
        type:Number,
        default:-1   // artist is not yet rated by the users of our app
    },
	  isActive: {
        type: Boolean,
        default: false
    },
    imagePath: {
        type:String,
        required: true,
        default:"defaultuser.png",
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
    }
});

ArtistSchema.statics.findByCredentials = function (email, password) {
    console.log("2elgedeed");
    var artist = this;
    console.log("2elgedeed2");
    console.log(email);
    return artist.findOne({ email }).then((artist) => {
        console.log("2elgedeed3");
        if (!artist) {
            console.log("not user");
            return Promise.reject();

        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, artist.password, (err, res) => {
                if (res) {
                    console.log("feh3ade");
                    resolve(artist);
                } else {
                    console.log(artist.password);
                    console.log("Passwordincorrect");
                    reject();
                }
            });
        })
    });

};
ArtistSchema.methods.generateAuthToken = function () {
    var artist = this;
    var access = 'auth';
    //console.log('hena');
    var token = jwt.sign({ _id: artist._id.toHexString(), access }, 'secretkeyforartist').toString();
    //console.log('henahena');
    return new Promise((resolve, reject) => {
        //console.log('henahenahena');
        resolve(token);

    });
}


//////////////////
ArtistSchema.statics.findByToken = async function (token) {
    var artist = this;
    var decoded;

    try {
        decoded = jwt.verify(token , 'secretkeyforartist');
    } catch (e) {
       return Promise.reject();
    }
    return artist.findOne({
     _id:decoded._id
    });

};

ArtistSchema.statics.ActivateByToken = function (token) {
    var newArtist = this;
    var decoded;

    try
	{
        decoded = jwt.verify(token , 'secretkeyforartist');
    }

	catch (e)
	{
       return Promise.reject();
    }


    return newArtist.findOneAndUpdate(
	{
     _id:decoded._id
    },
	{
		isActive:true
	}
	);


};


ArtistSchema.statics.findByEmail = function (reqEmail) {
    var artist = this;
    return artist.findOne({email:reqEmail});
};


var artist = mongoose.model('Artists', ArtistSchema);
module.exports={artist};
