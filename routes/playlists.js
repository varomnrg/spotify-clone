const router = require("express").Router();
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

router.get("/", (req, res, next) => {
    Playlist.find({})
        .then((playlists) => {
            playlists = playlists.map((playlist) => {
                return {
                    _id: playlist._id,
                    title: playlist.title,
                    description: playlist.description,
                    owner: playlist.owner,
                    createdAt: playlist.createdAt,
                };
            });

            res.json({
                status: "success",
                message: "Playlists list retrieved successfully",
                data: playlists,
            });
        })
        .catch((error) => {
            next(error);
        });
});

router.get("/:id", (req, res, next) => {
    Playlist.findById(req.params.id)
        .then((playlist) => {
            if (!playlist) {
                throw new Error("NotFoundPlaylist");
            }

            res.json({
                status: "success",
                message: "Playlist retrieved successfully",
                data: {
                    _id: playlist._id,
                    title: playlist.title,
                    description: playlist.description,
                    owner: playlist.owner,
                    createdAt: playlist.createdAt,
                },
            });
        })
        .catch((error) => {
            next(error);
        });
});

router.post("/", (req, res, next) => {
    const newPlaylist = new Playlist({
        title: req.body.title,
        description: req.body.description,
        owner: req.body.owner,
    });

    newPlaylist
        .save()
        .then((playlist) => {
            res.status(201).json({
                status: "success",
                message: "Playlist created successfully",
                data: {
                    _id: playlist._id,
                },
            });
        })
        .catch((error) => {
            next(error);
        });
});

router.get("/:id/songs", (req, res, next) => {
    Playlist.findById(req.params.id)
        .then((playlist) => {
            if (!playlist) {
                throw new Error("NotFoundPlaylist");
            }

            Song.find({ playlistId: playlist._id }).then((songs) => {
                songs = songs.map((song) => {
                    return {
                        _id: song._id,
                        title: song.title,
                        artist: song.artist,
                        url: song.url,
                        createdAt: song.createdAt,
                    };
                });

                res.json({
                    status: "success",
                    message: "Songs retrieved successfully",
                    data: {
                        _id: playlist._id,
                        title: playlist.title,
                        description: playlist.description,
                        owner: playlist.owner,
                        createdAt: playlist.createdAt,
                        songs,
                    },
                });
            });
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;
