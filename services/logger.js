import "dotenv/config"
import { createLogger, format, transports } from "winston"
import "winston-mongodb"

let option1 = {
    db: process.env.COMMUNITY_URI,
    options: { useUnifiedTopology: true },
    collection: "mongo_log_demo",
    format: format.combine(format.json(), format.metadata()),
    level: "error",
}

let option2 = {
    db: process.env.COMMUNITY_URI,
    options: { useUnifiedTopology: true },
    collection: "mongo_log_demo",
    format: format.combine(format.json(), format.metadata()),
    level: "info",
}

const successLogger = createLogger({
    transports: [new transports.MongoDB(option2)],
})

const errorLogger = createLogger({
    transports: [new transports.MongoDB(option1)],
})

export { errorLogger, successLogger }

