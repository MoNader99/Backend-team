// JavaScript source code
var { mongoose } = require("./db/mongoose.js"); 
var { artist } = require("./models/Artists.js");  //artists model
var addartist = (Email, Password, Artistname, About, Genres) => {
    var artist1 = new artist({
        email: Email,
        password: Password,
        artistName: Artistname,
        about: About,
        genres: Genres
    });
    console.log('da5al');
    //SAVING AND RETURNING ID OF THE NEW ARTIST
    artist1.save().then((res) => {
        console.log(res._id);
    }, (err) => {
        console.log(err);
    });
}
module.exports = {
    addartist

}

