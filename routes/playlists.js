const router = require("express").Router();
const PlaylistService = require("../services/playlists");
const SongService = require("../services/songs");

router.get("/", async (req, res, next) => {
    try {
        const playlists = await PlaylistService.getPlaylists();
        res.json({
            status: "success",
            message: "Playlists list retrieved successfully",
            data: playlists,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const playlist = await PlaylistService.getPlaylistById(req.params.id);
        res.json({
            status: "success",
            message: "Playlist retrieved successfully",
            data: playlist,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const playlist = req.body;
        const newPlaylist = await PlaylistService.createPlaylist(playlist);

        res.status(201).json({
            status: "success",
            message: "Playlist created successfully",
            data: newPlaylist,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id/songs", async (req, res, next) => {
    try {
        const playlistId = req.params.id;
        const songs = await SongService.getSongsByPlaylistId(playlistId);
        res.json({
            status: "success",
            message: "Songs list retrieved successfully",
            data: songs,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
