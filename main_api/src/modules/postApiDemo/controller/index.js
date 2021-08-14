const express =require('express')
const Status = require('http-status')
const {Success} = require('../../../utils/response')
const postApiDemoService = require("../service/postApiDemoService")
router= new express.Router()

const requestValidator = require("../../../middlewares/requestValidate")

router.post("/", requestValidator.requestValidate, async (req, res, next) => {
    try{
        const requestObj = req.body
        const page = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10000
        const pagination = {page, perPage}
        console.log(`Fetch Records Request Received For RequestObj ::: ${JSON.stringify(requestObj)} and pagination details ${JSON.stringify(pagination)}`)
        const keysRecords = await postApiDemoService.getKeysRecords(requestObj, pagination)
        res.status(Status.OK).json(Success(keysRecords))
    } catch (err) {
        next(err)
    }
})

module.exports = router