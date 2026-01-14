import multerSchema from "../model/multerSchema.js"

export const addPicture = async(req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            })
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/svg"]  
        if(!allowedTypes.includes(req.file.mimetype)){
            return res.status(400).json({
                success: false,
                message: "Invalid file type",
            })
        }

        // const imageUrl = `${req.file.filename}`
        // console.log(imageUrl)
        const imageUrl = `http://localhost:8001/upload/${req.file.filename}`

        const data = await multerSchema.create({
            picture: imageUrl
        })

        return res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}