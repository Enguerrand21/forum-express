import { User } from "../../models/User.js";
import slugify from "slugify";
import bcrypt from "bcrypt";

export async function register(signupData) {
    const {pseudo, email, password} = signupData
    const lowercaseEmail = email.toLowerCase()
    const existingUser = await User.findOne({
        $or: [{userName: pseudo}, {email: lowercaseEmail}]
    })

    if (existingUser) {
        throw new Error("Pseudo ou email déjà utilisé")
    }

    const normalizedUserName = slugify(pseudo,{lower: true, stric: true})

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