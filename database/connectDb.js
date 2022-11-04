const mongoose = require('mongoose');

module.exports = function () {
    let mongoConnectionString;

    switch (process.env.NODE_ENV) {
        case 'development':
            mongoConnectionString = process.env.MONGO_DEV_URI
            break;
        case 'test':
            mongoConnectionString = process.env.MONGO_TEST_URI
            break;
        default:
            mongoConnectionString = process.env.MONGO_PROD_URI
            break;
    }

    try {
        mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        
        mongoose.connection.on('error', err => {
            console.log(err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log(`Server disconnected from database at ${new Date().toISOString()}`)
        })

        console.log(`Server connected successfully to ${process.env.NODE_ENV} database.`)
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}