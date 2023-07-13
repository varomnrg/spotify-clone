const router = require("express").Router();
const Song = require("../models/Song");

router.get("/", (req, res, next) => {
    Song.find({})
        .then((songs) => {
            songs = songs.map((songs) => {
                return {
                    _id: songs._id,
                    title: songs.title,
                    artist: songs.artist,
                    playlistId: songs.playlistId,
                    url: songs.url,
                    createdAt: songs.createdAt,
                };
            });

            res.json({
                status: "success",
                message: "Songs list retrieved successfully",
                data: songs,
            });
        })
        .catch((error) => {
            next(error);
        });
});

router.get("/:id", (req, res, next) => {
    Song.findById(req.params.id)
        .then((song) => {
            if (!song) {
                throw new Error("NotFoundSong");
            }

            res.json({
                _id: song._id,
                title: song.title,
                artist: song.artist,
                playlistId: song.playlistId,
                url: song.url,
                createdAt: song.createdAt,
            });
        })
        .catch((error) => {
            next(error);
        });
});

router.post("/", (req, res, next) => {
    const newSong = new Song({
        title: req.body.title,
        artist: req.body.artist,
        playlistId: req.body.playlistId,
        url: req.body.url,
    });

    newSong
        .save()
        .then((song) => {
            res.status(201).json({
                status: "success",
                message: "Song created successfully",
                data: {
                    _id: song._id,
                },
            });
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;
