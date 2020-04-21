// JavaScript source code
var { mongoose } = require("./../db/mongoose.js"); 
var { artist } = require("./../models/artists.js");  //artists model

var { album } = require("./../models/album.js");
var { track } = require("./../models/track.js");//track model
var { followArtist } = require("./../models/followArtist.js");//track model

var GetTracksOfArtists = function (id) {
    return track.find({ artistId: id });
}
var GetAlbumsOfArtists = function (id) {
    return album.find({ artistId: id });
}
var getFollowArtistObject = function () {
    return followArtist.find({ 'userId': { $in: Artists.map(function (value) { return value.user_id.toString() }) } });

}
var getFollowedArtists = async function (userId) {
    var FollowedArtists = await followArtist.findOne({ 'user_id': userId });//.followedArtistInfo;
    return FollowedArtists.followedArtistInfo.map(function (value) { return value.artistId.toString(); });
        /*return followArtist.findOne({ 'user_id': userId }).followedArtistInfo;//.map(function (value) { return value.artistId.toString() }) ;
   then((fol) => {
        //console.log(userId);
        //console.log(fol);
        console.log(fol.followedArtistInfo);
    })*/
}
var deleteArtistFromSchema = function (artistId, userId) {
   // followArtist.findOne({ 'userId': userId }).then((userfollow) => {
    console.log(userId);
    console.log(artistId);
    //return followArtist.update({ 'user_id': userId }, { $pullAll: { artistId: [artistId] } })
    return followArtist.update({ user_id: userId }, { "$pull": { "followedArtistInfo": { "artistId": artistId } } });

}
var unFollowArtist = function (artistId, userId) {
    return deleteArtistFromSchema(artistId, userId).then((artist) => {
        console.log(artist);
        if (artist.nModified==0) return "notfound";
        if (artist.nModified==1) return "unfollowed"

    }).catch((err) => {
        Promise.reject(err);
    })


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
        if (!Art) return "undefined";
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
        const tracks = await Tracks.map(track => ((({ _id, trackName, imagePath }) => ({ _id, trackName, imagePath}))(track)));

        return Object.assign(artist, { Tracks:tracks })


    });
    return Promise.resolve(await Promise.all(promises));

}
var AddAlbums = async function (artists) {

    const promises = artists.map(async artist => {

        const Albums = await GetAlbumsOfArtists(artist._id);
        const albums = await Albums.map(album => ((({ _id, albumName, imagePath }) => ({ _id, albumName, imagePath}))(album)));
        return Object.assign(artist, { Albums: albums })


    });
    return Promise.resolve(await Promise.all(promises));

}
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
    GetArtistObjectArray,
    getFollowedArtists,
    unFollowArtist

}

