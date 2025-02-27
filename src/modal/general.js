import { nanoid } from "nanoid"

const general = async uid => {
    let data = {
        uid: uid || nanoid(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    return data
}

const timestamp = async () => {
    let data = {
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    return data
}

const updateTimestamp = async () => {
    let data = {
        updatedAt: new Date(),
    }
    return data
}

export { general, timestamp, updateTimestamp }