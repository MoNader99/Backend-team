// JavaScript source code
var { mongoose } = require("./../db/mongoose.js"); 
var { artist } = require("./../models/Artists.js");  //artists model

var { album } = require("./../models/album.js");
var { track } = require("./../models/track.js");//track model
var GetTracksOfArtists = function (id) {
    return track.find({ artistId: id });
}
var GetAlbumsOfArtists = function (id) {
    return album.find({ artistId: id });
}


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

        //const ArtistsWithTracks = await AddTracks(artists);

        //const Artists = await AddAlbums(ArtistsWithTracks);


        return Promise.resolve(artists.map(artist => GetSimplifiedArtist(artist)));




    })
        // return Promise.resolve(albums);
        .catch((err) => {
            return Promise.reject(err);
        })

}
var AddTracks = async function (artists) {

    const promises = artists.map(async artist => {

        const Tracks = await GetTracksOfArtists(artist._id);
        const tracks= await Tracks.map(track => ((({ _id, trackName, image}) => ({ _id, trackName, image}))(track)));

        return Object.assign(artist, { Tracks:tracks })


    });
    return Promise.resolve(await Promise.all(promises));

}
var AddAlbums = async function (artists) {

    const promises = artists.map(async artist => {

        const Albums = await GetAlbumsOfArtists(artist._id);
        const albums= await Albums.map(album => ((({ _id, albumName, image}) => ({ _id, albumName, image}))(album)));
        return Object.assign(artist, { Albums: albums })


    });
    return Promise.resolve(await Promise.all(promises));

}
var GetSimplifiedArtist = function (artist) {
    console.log("beysimplifyartist");
    console.log(artist.image);
    return ((({ _id,artistName,image,Albums,Tracks }) => ({ _id, artistName, image,Albums,Tracks}))(artist));

}
module.exports = {
    addartist,
    SearchInArtists,
    artist,
    GetArtistById,
    GetArtistObjectArray

}

