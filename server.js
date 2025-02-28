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
    origin: [""],
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

// Connect to MongoDB
mongoConnect();

// ✅ Export app for Vercel (instead of app.listen)
export default app;