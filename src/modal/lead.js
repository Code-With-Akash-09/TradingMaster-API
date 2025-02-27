import { general } from "./general.js"

const addLeadSchema = async (body) => {
    let generic = await general()
    let data = {
        ...generic,
        name: body?.name,
        mobile: body?.mobile,
        email: body?.email,
        state: body?.state
    }
    return data
}

export { addLeadSchema }