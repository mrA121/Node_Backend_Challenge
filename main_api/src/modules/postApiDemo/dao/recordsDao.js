"use strict"
const Records = require('../models/records')
const getRecords = async (filter, pagination) => {
    const result = await  Records.aggregate([
        {
            $project: {
                totalCount: {$sum: "$counts"},
                key:"$key",
                createdAt: "$createdAt"
            }
        },
        {
            $match: {
                $and: [
                    {$and:[{totalCount:{$gt: filter.minCount}}, {totalCount:{$lt: filter.maxCount}}]},
                    {$and:[{createdAt:{$gt: new Date(filter.startDate)}}, {createdAt:{$lt: new Date(filter.endDate)}}]}
                ]
            }
        },
        {
            $facet: {
                metadata: [ { $count: "totalRecords" }, { $addFields: { pageNumber: pagination.page, perPage: pagination.perPage } } ],
                data: [ { $skip: pagination.offset }, { $limit: pagination.perPage } ]
            }
        }
    ])
    return result
}
module.exports = {
    getRecords
}