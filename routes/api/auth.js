import express from "express"
import { register } from "../../services/auth/action.js"


const router = express.Router()

router.post("/signup", async(req,res)=> {
    const signupData = req.body
    console.log("received", signupData)

    const {pseudo, email, password, repeatedPassword} = signupData

    if(!signupData) {
        throw new Error("Données non conformes")
    }
    
    if(!pseudo || typeof pseudo !== "string" || pseudo.length < 3 || pseudo.length > 30) {
        throw new Error("Pseudo non conforme");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 254) {
        throw new Error("Email non conforme");
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,72}$/
    if (!password || typeof password !== "string" || !passwordRegex.test(password)) {
        throw new Error("Mot de passe non conforme");
        
    }

    if(!repeatedPassword || typeof repeatedPassword !== "string" || password !== repeatedPassword) {
        throw new Error("Mot de passe répété non conforme");
        
    }

    await register(signupData)
    return res.status(201).json({
        success: true,
        message: "Compte créé avec succès, vous pouvez maintenant vous connecter"
    })
})


export default router