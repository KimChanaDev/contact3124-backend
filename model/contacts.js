const { MongoClient } = require('mongodb')
require('dotenv').config()
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'ContactList'
const collectionName = 'Contacts'
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

module.exports.showAll = async function() {
    return await collection.find({}).toArray()
}

module.exports.showOne = async function(id) {
    const query = {cid: id}
    return await collection.findOne( query )
}

module.exports.addContact = async function(newContact) {
    return await collection.insertOne( newContact )
}

module.exports.updateContact = async function(id, newContact) {
    try {
        const query = {cid : id}
        const updateResult = await collection.updateOne(query, {$set: newContact})
        if ( updateResult.modifiedCount === 1) {
            return newContact
        } else {
            return {}
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports.deleteContact = async function(id) {
    try {
        const query = {cid: id}
        const deleteResult = await collection.deleteOne( query )
        return deleteResult
    } catch (error) {
        console.error(error);
    }
}