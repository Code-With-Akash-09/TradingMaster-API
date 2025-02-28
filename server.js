import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { mongoConnect } from "./db/mongo.js";
import leadRouter from "./routes/v1/lead.js";

const app = express();

// Logging middleware
app.use(morgan("tiny"));

// Middleware
app.use(cors({
    origin: "*", // Update this with your frontend URL in production
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/v1/lead", leadRouter);

// Test Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Node.js API' });
});

// Initialize MongoDB before starting the server
try {
    await mongoConnect();
} catch (error) {
    console.error('Failed to connect to MongoDB:', error);
}

// ✅ Export app for Vercel (instead of app.listen)
export default app;