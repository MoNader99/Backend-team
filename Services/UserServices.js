// JavaScript source code
const bcrypt = require('bcrypt');

var { mongoose } = require("./../db/mongoose.js");
var { User } = require("./../models/users.js");  //artists model
var { followUser } = require("./../models/followUser.js");//track model

var GetUserObjectArray = async function (wordtosearch) {
    //return track.find({ trackName: wordtosearch });
    // return track.find({ 'trackName': { '$regex': wordtosearch, $options: 'i' } , 'artistId': { $in: Artists.map(function (value) { return value._id }) } } );
    // try {
    // console.log(Artists.map(function (value) { return value._id.toString() }));

    return User.find({ 'userName': { '$regex': wordtosearch, $options: 'i' } });
    //var tracks = await track.find({ $or: [{ 'trackName': { '$regex': wordtosearch, $options: 'i' } }, { 'artistId': { $in: Artists.map(function (value) { return value._id.toString() }) } }] });
    //var tracks =
    //console.log(tracks);
    //return tracks;
    //  ['5e6942b6646c86bc20fc9a92']

    //  return track.find({ 'artistId': '5e6942b6646c86bc20fc9a92' });

    //   }
    //  catch (err) {
    //      console.log(err);
    //  }
    // var tracks = await track.find({ 'artistId':  });

}
var getUsersEndPoint = function (users) {
    return User.find({ _id: { $in: users } }).then((Users) => {
        return Users.map(function (value) { return value.endPoint; });

    })
}
var deleteUserFromSchema = function (followeduserid, userId) {
    // followArtist.findOne({ 'userId': userId }).then((userfollow) => {
    //console.log(userId);
   // console.log(artistId);
    //return followArtist.update({ 'user_id': userId }, { $pullAll: { artistId: [artistId] } })
    return followUser.update({ user_id: userId }, { "$pull": { "followedUserInfo": { "userId": followeduserid } } });

}
var addUserToSchema = function (followeduserid, userId,userName) {
    // followArtist.findOne({ 'userId': userId }).then((userfollow) => {
    //console.log(userId);
    // console.log(artistId);
    //return followArtist.update({ 'user_id': userId }, { $pullAll: { artistId: [artistId] } })
    return followUser.update({ user_id: userId }, { "$push": { "followedUserInfo": { "userId": followeduserid, "userName": userName, "followDate": Date.now() } } });

}
var addFacebookUser = function (facebookId, userName, email, gender, bdate) {
    console.log("bdate" + bdate);
    console.log(facebookId);
    console.log(userName);
    var newacc = new User(
        {
            userName: userName,
            email: email,
            facebookId: facebookId,
            gender: gender,
            birthDate: bdate

        });
    console.log(newacc);
  newacc.save().then((doc) => {
        console.log("2et7at");
        Promise.resolve(newacc);
    }).catch((err) => {
        console.log(err);
        Promise.reject();

    })
}
var signUpWithFacebook = function (facebookId, userName, email, gender, bdate) {
    console.log(facebookId);
    return User.findOne({ 'facebookId': facebookId }).then((user) => {
        if (!user) {
            addFacebookUser(facebookId,userName,email,gender,bdate).then((user) => {
                Promise.resolve(user);
            }).catch((err) => {
                Promise.reject();
        })
        }
        else {
            console.log(user.facebookId);
            return user;
        }
    })
}
var unFollowUser = function (followeduserid, userId) {
    return deleteUserFromSchema(followeduserid, userId).then((user) => {
        if (user.nModified == 1) return "unfollowed"
        if (user.nModified == 0) {
            return GetUserById(followeduserid).then((userName) => {
                return addUserToSchema(followeduserid, userId, userName).then((user2) => {
                    console.log("tane art");
                    console.log(user2);
                    if (user2.nModified == 1) return "followed";
                    else {
                        console.log(1);
                        console.log(2);
                        var followUser1 = new followUser({
                            user_id: userId,
                            followedUserInfo: [{
                                userId: followeduserid,
                                userName: userName,
                                followDate: Date.now(),
                                //rate:2,
                            }
                            ]
                        });
                        console.log(3);
                        return followUser1.save().then((res) => {
                            console.log(4);
                            return "followed";
                        }, (err) => {
                            return err;
                        });



                    }
                });
            });
        }

    }).catch((err) => {
        Promise.reject(err);
    })


}
var SearchInUsers = function (wordtosearch) {
    return GetUserObjectArray(wordtosearch).then(async (users) => {
        if (users.length === 0) return Promise.resolve([]);

        return Promise.resolve(users.map(user => GetSimplifiedUser(user)));



    })
        // return Promise.resolve(albums);
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })

}

var GetSimplifiedUser = function (user) {
    return ((({ _id, userName, imagePath }) => ({ _id, userName, imagePath}))(user));

}
var GetUserById = function (id) {
    console.log(id);
  //  console.log(artist.findById(id).artistName);
    return User.findById(id).then((user) => {
       // console.log(Art.artistName);
        if(!user) return "undefined"
        return user.userName;

    })


}
var HashPassword= async function(password)
{
  try {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
   return hashedPass;

  } catch (e) {
    console.log(e);
    console.log("faaaaiiiiilllleeeeddd");
    return Promise.reject();
  }
}


module.exports = {
    SearchInUsers,
    User,
    GetUserById,
    HashPassword,
    unFollowUser,
    signUpWithFacebook,
    getUsersEndPoint
}
