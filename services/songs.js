const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const { NotFoundError } = require("../utils/errorHandler");

exports.getSongs = async () => {
    try {
        const songs = await Song.find({}).select({ __v: 0 });
        return songs;
    } catch (error) {
        throw error;
    }
};

exports.getSongById = async (id) => {
    try {
        const song = await Song.findById(id).select({ __v: 0 });
        if (!song) throw new NotFoundError("Song Not Found");
        return song;
    } catch (error) {
        throw error;
    }
};

exports.createSong = async (songData) => {
    try {
        const newSong = new Song({
            title: songData.title,
            artist: songData.artist,
            playlistId: songData.playlistId,
            url: songData.url,
        });

        const createdSong = await newSong.save();
        return {
            _id: createdSong._id,
            title: createdSong.title,
            artist: createdSong.artist,
            playlistId: createdSong.playlistId,
            url: createdSong.url,
        };
    } catch (error) {
        throw error;
    }
};

exports.getSongsByPlaylistId = async (playlistId) => {
    try {
        const playlist = await Playlist.findById(playlistId).select({ __v: 0 });
        if (!playlist) throw new NotFoundError("Playlist Not Found");
        const songs = await Song.find({ playlistId: playlist._id }).select({});
        return {
            ...playlist._doc,
            songs,
        };
    } catch (error) {
        throw error;
    }
};
