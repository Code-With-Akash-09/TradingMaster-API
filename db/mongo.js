import "dotenv/config"
import { MongoClient } from "mongodb"

let _db, lead_coll
const mongoConnect = async () => {
    new Promise(async (resolve, reject) => {
        MongoClient.connect(process.env.COMMUNITY_URI, {
            // useNewUrlParser: true, // Deprecated option removed
        })
            .then(async client => {
                _db = await client.db()
                lead_coll = await _db.collection("leads")
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
        .then(async () => {
            console.log("Database plugged in and healthy to serve!")
        })
        .catch(err => {
            console.log("Error connecting to database")
            console.log(err)
        })
}

const leadColl = async () => {
    if (!lead_coll) {
        throw "Lead collection not found"
    }
    return lead_coll
}

export {
    leadColl,
    mongoConnect
}

