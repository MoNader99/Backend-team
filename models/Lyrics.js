var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var lyricsSchema = new mongoose.Schema({
  trackId: {
    type: String,
    unique: true,
    required: true,
  },
  Lyrics: {
    type: String,
    unique: true,
    required: true,
  },
});

var lyrics = mongoose.model("Lyrics", lyricsSchema);
module.exports = { lyrics, lyricsSchema };
