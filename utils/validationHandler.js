const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map((el) => el.message);
    let fields = Object.values(err.errors).map((el) => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join(" ");
        res.status(code).json({
            status: "error",
            meesage: "Invalid payload request",
            fields: fields,
        });
    } else {
        res.status(code).json({
            status: "error",
            meesage: "Invalid payload request",
            fields: fields,
        });
    }
};

module.exports = handleValidationError;
