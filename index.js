require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes");
const port = process.env.PORT || 3000;
const validator = require("./utils/validator.js");

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/api", router);

app.use(validator.validate);

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
