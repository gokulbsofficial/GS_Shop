const mongoClient = require('mongodb').MongoClient
const state = {
    db: null
}
module.exports.connect = (done) => {

    const url = 'mongodb+srv://gokul-sreejith:5006769+@cluster0.whi1v.gcp.mongodb.net/Shopping?retryWrites=true&w=majority';
    const dbname = 'Shopping'
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbname)
        done()
    })

}
module.exports.get = () => {
    return state.db
}
