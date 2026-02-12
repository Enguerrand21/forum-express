import express from "express"
import { getThreads } from "../../services/thread/queries.js"

const router = express.Router()

router.get("/", async (req, res) => {

    const threads = await getThreads()

    res.render("pages/home", threads)
})

router.get("/ajouter-une-discussion", (req,res) => {
    res.render("pages/ajouter-une-discussion")
})

router.get("/connexion", (req,res) => {
    res.render("pages/connexion")
})
router.get("/inscription", (req,res) => {
    res.render("pages/inscription")
})

export default router