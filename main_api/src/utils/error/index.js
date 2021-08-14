"use strict";
class CustomError extends Error {
    constructor(
        status = 500,
        code = "Generic",
        message = "",
        data = {},
        ...params
    ) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.code = code;
        this.status = status;
        this.message = message;
    }
}

module.exports = CustomError