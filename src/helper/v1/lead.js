import { leadColl } from "../../db/mongo.js"
import { addLeadSchema } from "../../modal/lead.js"

const create = async (body) => {
    return new Promise(async (resolve, reject) => {
        let lead_Coll = await leadColl()
        let data = await addLeadSchema(body)
        lead_Coll
            .insertOne(data)
            .then(async (result) => {
                let resp = {
                    code: 201,
                    error: false,
                    message: "Lead Created successfully",
                }
                resolve(resp)
            })
            .catch(err => {
                let resp = {
                    code: 500,
                    error: true,
                    message: "Failed to Create Lead",
                }
                reject(resp)
            })
    })
}

export { create as createLeadHelper }