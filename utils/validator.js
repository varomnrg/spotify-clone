const { NotFoundError } = require("./errorHandler");
const mongoose = require("mongoose");

exports.validate = (err, req, res, next) => {
    if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({
            status: "error",
            message: "Invalid playlist ID",
        });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({
            status: "error",
            message: err.message,
        });
    }

    if (err instanceof mongoose.Error.ValidationError) {
        return handleValidationError(err, res);
    }

    res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: err.message,
    });

    next();
};

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map((el) => el.message);
    let fields = Object.values(err.errors).map((el) => el.path);
    let code = 400;
    if (errors.length > 1) {
        res.status(code).json({
            status: "error",
            meesage: "Invalid payload request",
            missingFields: fields,
        });
    } else {
        res.status(code).json({
            status: "error",
            meesage: "Invalid payload request",
            missingField: fields[0],
        });
    }
};
