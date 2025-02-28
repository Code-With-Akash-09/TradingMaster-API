import "dotenv/config";
import { MongoClient } from "mongodb";

let _db, lead_coll

const mongoConnect = async () => {
    try {
        const client = await MongoClient.connect(process.env.COMMUNITY_URI, {
            maxPoolSize: 50,
            connectTimeoutMS: 5000,
            useUnifiedTopology: true
        });

        _db = client.db();
        lead_coll = _db.collection("leads");
        console.log("Database connected successfully!");
        return _db;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

const leadColl = () => {
    if (!lead_coll) {
        throw new Error("Lead collection not initialized");
    }
    return lead_coll;
}

export {
    leadColl,
    mongoConnect
};

