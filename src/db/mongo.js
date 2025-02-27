import "dotenv/config";
import { MongoClient } from "mongodb";

let _db, lead_coll;

const mongoConnect = async () => {
    try {
        const client = await MongoClient.connect(process.env.COMMUNITY_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        _db = client.db(process.env.DB_NAME || "tradingmaster");
        lead_coll = _db.collection("leads");

        console.log("✅ Database plugged in and healthy to serve!");
    } catch (error) {
        console.error("❌ Error connecting to database:", error);
        process.exit(1);
    }
};

const leadColl = async () => {
    if (lead_coll) return lead_coll;
    throw new Error("❌ Lead collection not found!");
};

export { leadColl, mongoConnect };
