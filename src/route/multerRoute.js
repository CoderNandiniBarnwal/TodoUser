import express from "express"
import { upload } from "../controller/multerController.js"
import { addPicture } from "../controller/addPicture.js"

const multerRoute = express.Router()

multerRoute.post("/upload", upload.single("picture"), addPicture)

export default multerRoute