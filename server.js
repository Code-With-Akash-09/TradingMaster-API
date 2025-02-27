import cors from "cors"
import "dotenv/config"
import express from "express"

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
    origin: [""],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

// Test Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Node.js API' });
});

// Start Server
app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server ready to roll on an anonymous port!`);
});
