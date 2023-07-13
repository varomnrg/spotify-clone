const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
