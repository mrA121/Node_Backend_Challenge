"use strict"
const Success = (data) => {
    return {
        code: 0,
        msg: "Success",
        records: data
    }
}

const Failure = (err) => {
    return {
        code: err.status,
        msg: err.message
    }
}

module.exports ={
    Success,
    Failure
}