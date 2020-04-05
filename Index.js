// JavaScript source code
console.log("sfhdsfjewfwePFjguh.kh");
const config = require("./Config/Config.js");
const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users');
const album = require('./models/album');
//const artist = require('./models/artists');
//const track = require('./models/track');




const usersRoutes = require('./Controllers/UserController');
const albumsRoutes = require('./Controllers/AlbumController');
const artistRoutes = require('./Controllers/ArtistController');
const playlistRoutes = require('./Controllers/PlaylistController');
const trackRoutes = require('./Controllers/TracksController');
const searchRoute = require('./Controllers/SearchController');


const app = express();
var cors = require('cors');
app.use(cors());
app.use('/Images',express.static(__dirname + '/Pictures'));
app.use(bodyParser.json());


app.use("/", usersRoutes);
app.use("/", albumsRoutes);
app.use("/", artistRoutes);
app.use("/", playlistRoutes);
app.use("/", trackRoutes);
app.use("/", searchRoute);


app.listen(3000,()=>{
    console.log("Started on port 3000");
});

module.exports=app