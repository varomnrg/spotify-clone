require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const handleValidationError = require("./utils/validationHandler.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/api", router);

app.use((err, req, res, next) => {
    console.log("the name is", err);

    if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({
            status: "error",
            message: "Invalid playlist ID",
        });
    }

    if (err.message === "NotFoundPlaylist") {
        return res.status(404).json({
            status: "error",
            message: "Playlist not found",
        });
    }

    if (err.message === "NotFoundSong") {
        return res.status(404).json({
            status: "error",
            message: "Song not found",
        });
    }

    if (err.name === "ValidationError") {
        return handleValidationError(err, res);
    }

    res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err.message,
    });
});

mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(port, () => {
            console.log(`Playtify App listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
