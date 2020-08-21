const MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017/'
const assert = require('assert')
var dbName = 'myapp'


function connect(callback) {
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('数据库连接错误', err)
        } else {
            var db = client.db(dbName)
            callback && callback(db)
            client.close()
        }
    })
}
module.exports = {
    connect
}