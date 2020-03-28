// JavaScript source code
console.log("sfhdsfjewfwePFjguh.kh");
const config = require("./Config/Config.js");
const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users');
const album = require('./models/album');
//const artist = require('./models/artists');
const image = require('./models/images');
//const track = require('./models/track');


const usersRoutes = require('./Controllers/UserController');
const albumsRoutes = require('./Controllers/AlbumController');
//const artistRoutes = require('./Controllers/ArtistController');
const imageRoutes = require('./Controllers/ImageController');
const playlistRoutes = require('./Controllers/PlaylistController');
//const trackRoutes = require('./Controllers/TracksController');

const app = express();

app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.use("/album", albumsRoutes);
//app.use("/artists", artistRoutes);
app.use("/Images", imageRoutes);
app.use("/playlists", playlistRoutes);
//app.use("/playlists", trackRoutes);


app.listen(3000,()=>{
    console.log("Started on port 3000");
});