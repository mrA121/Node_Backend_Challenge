"use strict";
const requestValidate = require("./index")
const CustomError = require ("../../utils/error")
describe("schema validation tests", () => {
    const schema = requestValidate.schemas["post"]["/api/V1/postApiDemo/"]
    it("toBe Valid Schema", () => {
        expect(requestValidate.validateSchema(schema, {
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: 2700,
            maxCount: 3000
        })).toEqual({
            startDate: new Date("2016-01-26"),
            endDate: new Date("2018-02-02"),
            minCount: 2700,
            maxCount: 3000
        });
        expect(requestValidate.validateSchema(schema, {
            startDate: "2016-01-26",
            endDate: "2018-02-02",
            minCount: "2700",
            maxCount: "3000"
        })).toEqual({
            startDate: new Date("2016-01-26"),
            endDate: new Date("2018-02-02"),
            minCount: 2700,
            maxCount: 3000
        });
        expect(requestValidate.validateSchema(schema, {})).toEqual({
            startDate: new Date("1970-01-01T00:00:00.000Z"),
            endDate: new Date("4707-11-29T00:00:00.000Z"),
            minCount: 0,
            maxCount: 9007199254740991
        })
        expect(requestValidate.validateSchema(schema, {
            startDate: null,
            endDate: null,
            minCount: null,
            maxCount: null
        })).toEqual({
            startDate: new Date("1970-01-01T00:00:00.000Z"),
            endDate: new Date("4707-11-29T00:00:00.000Z"),
            minCount: 0,
            maxCount: 9007199254740991
        });
        expect(requestValidate.validateSchema(schema, {
            minCount: 100
        })).toEqual({
            startDate: new Date("1970-01-01T00:00:00.000Z"),
            endDate: new Date("4707-11-29T00:00:00.000Z"),
            minCount: 100,
            maxCount: 9007199254740991
        })
    });
    it("toBe In-Valid Schema", () => {
        expect(() => {requestValidate.validateSchema(schema, {
            startDate: "Random String",
            endDate: "2018-02-02",
            minCount: 2700,
            maxCount: 3000
        })}).toThrow("Invalid request data. Please review request and try again.");
        expect(()=> {requestValidate.validateSchema(schema, {
            startDate: "Random String",
            endDate: "Random String",
            minCount: 800,
            maxCount: 3000
        })}).toThrow("Invalid request data. Please review request and try again.");
        expect(()=> {requestValidate.validateSchema(schema, {
            startDate: "2016-02-02",
            endDate: "2018-02-02",
            minCount: "",
            maxCount: 2800
        })}).toThrow("Invalid request data. Please review request and try again.");
        expect(()=> {requestValidate.validateSchema(schema, {
            startDate: "2018-02-02",
            endDate: "2018-02-02",
            minCount: "Random String",
            maxCount: 3000
        })}).toThrow("Invalid request data. Please review request and try again.");
        expect(()=> {requestValidate.validateSchema(schema, {
            startDate: "",
            endDate: "2018-02-02",
            minCount: 2700,
            maxCount: 3000
        })}).toThrow("Invalid request data. Please review request and try again.");

    });
});