const express = require('express')
const cors = require('cors')
const router = require("./router")
const {Failure} = require("./utils/response")

const bodyParser = require('body-parser')
const app = express()
const TEST_MODE = process.env.TEST_MODE

app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,browsertimezone,Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
app.disable('x-powered-by')

app.use(bodyParser.json())

router(app)

app.use((error, req, res, next) => {
    if (!TEST_MODE) console.log(error);
    const status = error.status || 500;
    res.status(status).json(Failure(error))
})

module.exports = app
