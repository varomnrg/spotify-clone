const Playlist = require("../models/Playlist");
const { NotFoundError } = require("../utils/errorHandler");

exports.getPlaylists = async () => {
    try {
        const playlists = await Playlist.find({}).select({ __v: 0 });
        return playlists;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getPlaylistById = async (id) => {
    try {
        const playlist = await Playlist.findById(id).select({ __v: 0 });
        if (!playlist) throw new NotFoundError("Playlist Not Found");
        return playlist;
    } catch (error) {
        throw new Error(error);
    }
};

exports.createPlaylist = async (playlistData) => {
    try {
        const newPlaylist = new Playlist({
            title: playlistData.title,
            description: playlistData.description,
            owner: playlistData.owner,
        });

        const createdPlaylist = await newPlaylist.save();
        return {
            _id: createdPlaylist._id,
            title: createdPlaylist.title,
            description: createdPlaylist.description,
            owner: createdPlaylist.owner,
            createdAt: createdPlaylist.createdAt,
        };
    } catch (error) {
        throw new Error(error);
    }
};
