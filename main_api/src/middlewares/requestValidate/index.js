"use strict"
const joi = require("joi")
const CustomError = require ("../../utils/error")
const schemas = {
    post:  {
        "/api/V1/postApiDemo/": joi.object().keys({
            startDate: joi.date().iso().allow(null).empty(null).default(new Date(0)),
            endDate: joi.date().iso().allow(null).empty(null).default(new Date(86400000000000)),
            minCount: joi.number().integer().allow(null).empty(null).default(0),
            maxCount: joi.number().integer().allow(null).empty(null).default(Number.MAX_SAFE_INTEGER)
        })
    }
}
const validateSchema = (schema, data) => {
    const result = schema.validate(data)
    if (result.error) {
        throw new CustomError(
            400,
            "BAD_REQUEST",
            "Invalid request data. Please review request and try again."
        )
    }
    return result.value
}

const requestValidate = (req, res, next) => {
    const supportedMethods = ["post", "put"];
    const method = req.method.toLowerCase()
    if (supportedMethods.includes(method)) {
        const schema = schemas[method][`${req.baseUrl}${req.path}`];
        if (schema) {
            const result = validateSchema(schema, req.body)
            req.body = result
            next()
        } else {
            next()
        }
    } else {
        next()
    }
}

module.exports = {
    schemas,
    requestValidate,
    validateSchema
}