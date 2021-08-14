const mongoose =require('mongoose')
const Schema= mongoose.Schema;

const RecordsSchema = new Schema({
    key: {
        type: String,
        required:true
    },
    value: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        required:true
    },
    counts: {
        type: Number,
        required:true
    }
});


module.exports= mongoose.model('records', RecordsSchema)