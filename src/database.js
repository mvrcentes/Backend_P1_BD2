import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({ path: "./.env.local" })

const URI = process.env.MONGODB_URI

mongoose.connect(URI, {
    useNewUrlParser: true
})

const connection = mongoose.connection

connection.once("open", () => {
    console.log("DB is connected")
})

export default connection