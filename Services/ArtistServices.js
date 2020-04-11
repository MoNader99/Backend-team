// JavaScript source code
var { mongoose } = require("./../db/mongoose.js"); 
var { artist } = require("./../models/artists.js");  //artists model

var { album } = require("./../models/album.js");
var { track } = require("./../models/track.js");//track model
/**
 * function that get tracks of an artist
 * @method GetTracksOfArtists
 * @author aya
 * @param   {string} id -id of the artist
 * @returns {array} -array of tracks of the artist
 * 
 */
var GetTracksOfArtists = function (id) {
    return track.find({ artistId: id });
}
/**
 * function that get albums of an artist
 * @method GetAlbumsOfArtists
 * @author aya
 * @param   {string} id -id of the artist
 * @returns {array} -array of albums of the artist
 * 
 */
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

/**
 * gets an array of artist objects
 * @author aya
 * @method GetArtistObjectArray
 * 
 *@param {string} wordtosearch
 *@returns {array}  -array of artists matching the search
 * 
 */

var GetArtistObjectArray = function (wordtosearch) {
    //return artist.find({ artistName: wordtosearch });
    return artist.find({ 'artistName': { '$regex': wordtosearch, $options: 'i' } });

    
}
/**
 * function that handles search in artists in search requests
 * @method SearchInArtists
 * @author aya
 * @param   {string} wordtosearch -the word I want to search about
 * @returns {array} -return array of artists that is the result of the search
 * 
 */
/*var SearchInArtists = function (wordtosearch) {
    console.log("D5al");
    return GetArtistObjectArray(wordtosearch).then((artists) => {
        console.log("ijgifjgf" + artists.map(function (value) { return value._id }));
        return Promise.resolve(artists.map(function (value) { return value._id }));
    }
    ).catch((err) => {
        return Promise.reject(err);
    })
}*/
/**
 * function that return artist by id
 * @method GetArtistById
 * @author aya
 * @param   {string} id -the id of artist to search for
 * @returns {string} -return artistname of the artist
 * 
 */
var GetArtistById = function (id) {
    console.log(id);
    console.log(artist.findById(id).artistName);
    return artist.findById(id).then((Art) => {
        if (!Art) return "undefined";
        console.log(Art.artistName);
        return Art.artistName;

    })
}
/**
 * function that handles search in artists in search requests
 * @method SearchInArtists
 * @author aya
 * @param   {string} wordtosearch -the word I want to search about
 * @returns {array} -return array of artists that is the result of the search
 * 
 */
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
/**
 * function that adds tracks to the array of artists objects
 * @method AddTracks
 * @author aya
 * @param   {array} artists -the array of artists we want to add tracks to
 * @returns {array} -return array of artists after adding tracks
 * 
 */
var AddTracks = async function (artists) {

    const promises = artists.map(async artist => {

        const Tracks = await GetTracksOfArtists(artist._id);
        const tracks = await Tracks.map(track => ((({ _id, trackName, imagePath }) => ({ _id, trackName, imagePath}))(track)));

        return Object.assign(artist, { Tracks:tracks })


    });
    return Promise.resolve(await Promise.all(promises));

}
/**
 * function that adds albums to the array of artists objects
 * @method AddAlbums
 * @author aya
 * @param   {array} artists -the array of artists we want to add albums to
 * @returns {array} -return array of artists after adding albums
 * 
 */
var AddAlbums = async function (artists) {

    const promises = artists.map(async artist => {

        const Albums = await GetAlbumsOfArtists(artist._id);
        const albums = await Albums.map(album => ((({ _id, albumName, imagePath }) => ({ _id, albumName, imagePath}))(album)));
        return Object.assign(artist, { Albums: albums })


    });
    return Promise.resolve(await Promise.all(promises));

}

/**
 * function that gets simplified albums
 * @method GetSimplifiedArtist
 * @author aya
 * @param   {object} artist -the artist we want to simplify
 * @returns {object} -artist after simplification
 * 
 */
var GetSimplifiedArtist = function (artist) {
    console.log("beysimplifyartist");
    console.log(artist.image);
    return ((({ _id, artistName, imagePath, Albums, Tracks }) => ({ _id, artistName, imagePath,Albums,Tracks}))(artist));

}
module.exports = {
    addartist,
    SearchInArtists,
    artist,
    GetArtistById,
    GetArtistObjectArray

}

