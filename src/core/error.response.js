const StatusCode = {
    FORBIDDEN: 404,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: "Bad Request error",
    CONFLICT: "Conflict error"
}

const {
    ReasonPhrases,
    StatusCodes
} = require('../utils/httpStatusCode');

const logger = require('../loggers/winston.log');

class ErrorResponse extends Error {
    constructor( message, status ){
        super(message);
        this.status = status;
        //log error 
        logger.error(`${this.status} - ${this.message}`);
    }
}

class ConflictRequestError extends ErrorResponse {

    constructor( message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN ){
        super(message, statusCode );
    }
}

class BadRequestError extends ErrorResponse {
    constructor( message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN ){
        super(message, statusCode );
    }
}

class AuthFailureError extends ErrorResponse {
    constructor( message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED ){
        super(message, statusCode );
    }
}

class NotFoundError extends ErrorResponse {
    constructor( message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND ){
        super(message, statusCode );
    }
}

class ForBiddenError extends ErrorResponse {
    constructor( message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN ){
        super(message, statusCode );
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError,
    ForBiddenError
}