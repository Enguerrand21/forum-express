import express from "express"
import { authenticateUser, register } from "../../services/auth/action.js"
import AppError from "../../utils/errors/customError.js"


const router = express.Router()

router.post("/signup", async(req,res)=> {
    const signupData = req.body
    console.log("received", signupData)

    const {pseudo, email, password, repeatedPassword} = signupData

    if(!signupData) {
        throw new AppError("Données non conformes", 400)
    }
    
    if(!pseudo || typeof pseudo !== "string" || pseudo.length < 3 || pseudo.length > 30) {
        throw new AppError("Pseudo non conforme", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 254) {
        throw new AppError("Email non conforme", 400);
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,72}$/
    if (!password || typeof password !== "string" || !passwordRegex.test(password)) {
        throw new AppError("Mot de passe non conforme", 400);
        
    }

    if(!repeatedPassword || typeof repeatedPassword !== "string" || password !== repeatedPassword) {
        throw new AppError("Mot de passe répété non conforme", 400);
        
    }

    await register(signupData)
    return res.status(201).json({
        success: true,
        message: "Compte créé avec succès, vous pouvez maintenant vous connecter"
    })
})

router.post("/signin", async(req,res)=> {
    console.log("Signing in", req.body);
    const signinData = req.body

    if(!signinData) {
        throw new AppError("Erreur lors de la connexion, 400")
    }
    
    const {email, password} = signinData
    
    if (!email || typeof email !== "string" || !password || typeof password !== "string"){
        
        throw new AppError("Erreur lors de la connexion, 400")
    }
    const result = await authenticateUser(email, password)
    res.cookie("sessionId", result.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 1000,
        sameSite: "lax" //CSRF
    })

    return res.status(201).json({success: true})
})

export default router