// JavaScript source code
var { mongoose } = require("./../db/mongoose.js"); 
var { artist } = require("./../models/Artists.js");  //artists model
var { GetArtistById } = require("./../Services/ArtistServices");
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
    //return artist.find({ artistName: wordtosearch });
    return artist.find({ 'artistName': { '$regex': wordtosearch, $options: 'i' } });

    
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
var GetArtistById = function (id) {
    console.log(id);
    console.log(artist.findById(id).artistName);
    return artist.findById(id).then((Art) => {
        console.log(Art.artistName);
        return Art.artistName;

    })
    

}

var SearchInArtists = function (wordtosearch) {
    console.log("adadadadadadadadadadadadadadada");
    return GetArtistObjectArray(wordtosearch).then(async (artists) => {
        console.log(1);
        if (artists.length === 0) return Promise.resolve([]);
        console.log(2);
        return Promise.resolve(artists.map(artist => GetSimplifiedArtist(artist)));




    })
        // return Promise.resolve(albums);
        .catch((err) => {
            return Promise.reject(err);
        })

}
var GetSimplifiedArtist = function (artist) {
    console.log("beysimplify");
    console.log(artist.image);
    return ((({ _id,artistName,image }) => ({ _id, artistName, image}))(artist));

}
module.exports = {
    addartist,
    SearchInArtists,
    artist,
    GetArtistById

}

