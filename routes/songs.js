const router = require("express").Router();
const Song = require("../models/Song");
const SongService = require("../services/songs");

router.get("/", async (req, res, next) => {
    try {
        const songs = await SongService.getSongs();
        res.json({
            status: "success",
            message: "Songs list retrieved successfully",
            songs,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const song = await SongService.getSongById(req.params.id);
        res.json({
            status: "success",
            message: "Song retrieved successfully",
            data: song,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const song = req.body;
        const newSong = await SongService.createSong(song);

        res.status(201).json({
            status: "success",
            message: "Song created successfully",
            data: newSong,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
