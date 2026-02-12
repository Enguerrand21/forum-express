import mongoose from "mongoose"

export async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connecté à la base de donnée:", mongoose.connection.name);
    }
    catch(error){
        console.error("erreur de connexion à Mongo:", error);
        throw new Error("La connexion à mongo a échoué")        
    }
}