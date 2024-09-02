import mongoose from "mongoose";
import { MONGODB_CREDENTIALS } from "@config/env.config";
const DB_USERNAME: string = MONGODB_CREDENTIALS.username;
const DB_PASSWORD: string = MONGODB_CREDENTIALS.password;

export default async function connection() {
    try
    {
        await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.t9i2bmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("Database Connected Successfully");
        return true
    } catch (error)
    {
        console.log("Database Connection Failed");
        console.log(error);
        return false;
    }
}

