const mongo = require('./mongo');

mongo.tryConnect()
.then(_ => { require('./index') })
.catch(err => { console.log(err) })