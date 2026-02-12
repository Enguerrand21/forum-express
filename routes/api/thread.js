import express from "express"
import { createThread } from "../../services/thread/actions.js"

const router = express.Router()

router.post("/create", async (req,res) => {
    console.log("Hello from create", req.body)
    
    const {title, content} = req.body

    if(typeof title !== "string" || title.trim() === "" || title.length <3) {
        throw new Error("Le titre est requis 🔴")
    }

    if (typeof content !== "string" || content.trim() === ""){
         throw new Error("Le contenu du premier post est requis")
    }
    const result = await createThread(title, content)

    return res.status(201).json({
        message: "Thread créé avec succès 🟢",
        thread: result.thread
    })


    
})

export default router