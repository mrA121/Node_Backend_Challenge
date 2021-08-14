require('dotenv').config()
const app = require("./src/app");
const mongoose = require("mongoose");
const colors = require("colors/safe");
const PORT = 3000

mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(result => console.log(`Mongo DB Connection ${colors.green('OK')}`))
    .then(result => app.listen(3000, () => {
        console.log(`🤘 API === Running on Port ${PORT}`);
        console.log(`URL http://localhost:${PORT}`);
    }))
    .catch(err => console.log(err));