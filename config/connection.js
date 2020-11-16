const mongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const state = {
    db: null,
};
module.exports.connect = (done) => {
    const url = process.dotenv.DB_URL;
    const dbname = process.dotenv.DB_NAME;
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
        if (err) return done(err);
        state.db = data.db(dbname);
        done();
    });
};
module.exports.get = () => {
    return state.db;
};
