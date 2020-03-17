// JavaScript source code
var { mongoose } = require("./../db/mongoose.js"); 
var { artist } = require("./../models/Artists.js");  //artists model
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


var GetArtistObjectArray = function (wordtosearch) {
    return artist.find({ artistName: wordtosearch });
}
var SearchInArtists = function (wordtosearch) {
    console.log("D5al");
    return GetArtistObjectArray(wordtosearch).then((artists) => {
        console.log("ijgifjgf" + artists.map(function (value) { return value._id }));
        return Promise.resolve(artists.map(function (value) { return value._id }));
    }
    ).catch((err) => {
        return Promise.reject(err);
    })

}
module.exports = {
    addartist,
    SearchInArtists

}

