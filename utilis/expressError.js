class expressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        console.log("ExpressError created:", statusCode, message);
    }
}
module.exports = expressError;