"use strict"
require('dotenv').config()
const request = require("supertest");
const app = require("../../../app");
const mongoose = require("mongoose");
const colors = require("colors/safe");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(`Mongo DB Connection ${colors.green('OK')}`)
})
afterAll(async () => {
    await mongoose.connection.close()
    console.log(`Mongo DB Connection Closed ${colors.green('OK')}`)
})
/**
 * E2E test for POST /api/V1/postApiDemo/
 * Cases:-
 * 1. Success Case POST /api/V1/postApiDemo/
 * 2. Success Case POST /api/V1/postApiDemo?page=2&perPage=100 (paginated query)
 * 3. Failure Case POST /api/V1/postApiDemo
 */

describe("E2E TEST ::: For Post API Demo Service", () => {
    test("Success POST /api/V1/postApiDemo/", async () => {
        const response = await request(app)
            .post("/api/V1/postApiDemo/")
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            })
            .set("Accept", "application/json")
        expect(response.statusCode).toBe(200)
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe("Success")
        expect(response.body.records[0].metadata[0].totalRecords).toBe(63)
    })

    test("Success POST /api/V1/postApiDemo?page=2&perPage=10", async () => {
        const response = await request(app)
            .post("/api/V1/postApiDemo?page=2&perPage=10")
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            })
            .set("Accept", "application/json")
        expect(response.statusCode).toBe(200)
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe("Success")
        expect(response.body.records[0].metadata[0].totalRecords).toBe(63)
        expect(response.body.records[0].metadata[0].pageNumber).toBe(2)
        expect(response.body.records[0].metadata[0].perPage).toBe(10)
    })

    test("Failure POST /api/V1/postApiDemo/", async () => {
        const response = await request(app)
            .post("/api/V1/postApiDemo/")
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": "Random",
                "maxCount": 3000
            })
            .set("Accept", "application/json")
        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(400)
        expect(response.body.msg).toBe("Invalid request data. Please review request and try again.")
    })
})