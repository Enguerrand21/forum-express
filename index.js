import express from "express"
import pagesRouter from "./routes/pages/index.js"
import threadsRouter from "./routes/api/thread.js"
import authRouter from "./routes/api/auth.js"
import dotenv from "dotenv"
import { connectToDB } from "./utils/db/mongoConnection.js"

dotenv.config()
await connectToDB()

const app = express()

app.use(express.json())
app.use ("/vendor/quill", express.static("node_modules/quill/dist"))
app.use(express.static("public"))

app.set("view engine","ejs")

app.use("/", pagesRouter)

app.use("/api/threads", threadsRouter)
app.use("/api/auth", authRouter)

app.listen(3000, () => {
    console.log("serveur demarré sur http://127.0.0.1:3000/");
    
})