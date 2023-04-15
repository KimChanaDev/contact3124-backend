const { MongoClient } = require('mongodb')
require('dotenv').config()
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'ContactList'
const collectionName = 'Users'
let db
let collection

// config setup database
async function dbConnect(){
    await client.connect()
    console.log('database connection successfully');
    db = client.db( dbName )
    collection = db.collection( collectionName )
}
dbConnect().catch(console.error)

module.exports.ensureUser = async function(user) {
    const findResult = await collection.findOne(user)
    return findResult ? 1 : 0;
}

