import { createLeadHelper } from "../../helper/v1/lead.js"

const create = async (req, res) => {
    let body = req.body
    createLeadHelper(body)
        .then(async result => {
            res.status(result.code).json({
                message: result.message,
                error: result.error,
                code: result.code,
                results: {
                    data: result,
                },
            })
        })
        .catch(err => {
            res.status(err?.code || 500).json({
                message: "Error in creating user",
                error: err.error || true,
                code: err.code || 500,
                results: {
                    data: {
                        error: err.message,
                    },
                },
            })
        })
}

export { create }

