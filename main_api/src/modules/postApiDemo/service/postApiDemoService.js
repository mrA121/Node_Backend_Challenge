"use strict"
const recordsDao = require("../dao/recordsDao")
/**
 * @param requestObj (request object containing start date, end date, min count,
 *                    max count on which we want to filter records)
 * @param pagination (pagination object contains page number and per page number
 *                    of records which we want to fetch)
 * @returns {Promise<*>} (returns promise which on resolving provides records)
 */
const getKeysRecords = async (requestObj,pagination) => {
    pagination.offset = (pagination.page - 1) * pagination.perPage
    const records = await recordsDao.getRecords(requestObj, pagination)
    return records
}

module.exports = {
    getKeysRecords
}