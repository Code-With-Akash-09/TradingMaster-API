import cors from "cors";
import "dotenv/config";
import express from "express";
import { mongoConnect } from "./src/db/mongo.js";
import leadRouter from "./src/routes/v1/lead.js";
import morgan from "morgan";

const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(cors({ origin: "*", methods: ["POST", "GET", "PUT", "DELETE"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB before handling requests
const startServer = async () => {
    await mongoConnect(); // ✅ Ensures DB is connected before API requests
    console.log("✅ Database connected. Setting up routes...");

    // API Routes
    app.use("/v1/lead", leadRouter);

    // Test Route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to the Node.js API" });
    });
};

// Initialize DB connection before starting the app
startServer().catch(err => {
    console.error("❌ MongoDB connection failed:", err);
});

// ✅ Export app for Vercel
export default app;
