const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
    },
    artist: {
        type: Array,
        required: true,
        minlength: 1,
    },
    playlistId: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
