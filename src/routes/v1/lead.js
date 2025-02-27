import { Router } from "express";
import { create } from "../../controller/v1/lead.js";

const leadRouter = Router()

leadRouter.post("/create", create)

export default leadRouter