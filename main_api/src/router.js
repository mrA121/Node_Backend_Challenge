"use strict"
const postApiDemoController = require("./modules/postApiDemo/controller")
/**
 *
 * @param app
 * register all the app routes for different modules
 */
module.exports = (app) => {
    app.use("/api/V1/postApiDemo", postApiDemoController)
}