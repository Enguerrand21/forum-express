import { User } from "../../models/User.js";
import slugify from "slugify";
import bcrypt from "bcrypt";
import AppError from "../../utils/errors/customError.js";
import { Session } from "../../models/Session.js";

export async function register(signupData) {
    const {pseudo, email, password} = signupData
    const lowercaseEmail = email.toLowerCase()
    const existingUser = await User.findOne({
        $or: [{userName: pseudo}, {email: lowercaseEmail}]
    })

    if (existingUser) {
        throw new AppError("Pseudo ou email déjà utilisé", 409, true)
    }

    const normalizedUserName = slugify(pseudo,{lower: true, strict: true})

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        userName: pseudo,
        normalizedUserName,
        email: lowercaseEmail,
        password : hashedPassword
    })

    await newUser.save()
}

export async function authenticateUser(email, password) {
    const user = await User.findOne({email: email})

    if(!user) {
        throw new AppError("Email ou mot de passe incorrect", 401, true)
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw  new AppError("Email ou mot de passe incorrect", 401, true)
    }

    const existingSession = await Session.findOne({userId: user._id, expiresAt: {$gt: new Date()}})

    let session;
    if(existingSession) {
        session = existingSession
    } else {
        session = new Session({
            userId: user._id,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000)
        })
        await session.save()
    }
    return {sessionId: session.id.toString()}
}


