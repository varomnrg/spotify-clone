var router = require("express").Router();

router.use("/playlists", require("./playlists"));
router.use("/songs", require("./songs"));

module.exports = router;
