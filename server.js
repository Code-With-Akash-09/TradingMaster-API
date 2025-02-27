import cors from "cors"
import "dotenv/config"
import express from "express"
import { mongoConnect } from "./src/db/mongo.js";
import leadRouter from "./src/routes/v1/lead.js";
import { cpus } from "os";
import morgan from "morgan";
import cluster from "cluster";

console.log(cpus().length)

const app = express();

app.use(morgan("tiny"))

// Middleware

app.use(cors({
    origin: [""],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

if (cluster.isPrimary) {
    console.log(`Number of CPUs is ${cpus().length}`)
    console.log(`Master ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
        console.log("Let's fork another worker!")
        cluster.fork()
    })
} else {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    // API Route

    app.use("/v1/lead", leadRouter)

    // Test Route
    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to the Node.js API' });
    });

    mongoConnect()

    // Start Server
    app.listen(parseInt(process.env.PORT), () => {
        console.log(`Server ready to roll on an anonymous port!`);
    });
}
