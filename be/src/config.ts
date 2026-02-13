import dotenv from 'dotenv'
dotenv.config();


export const MONGO_URL = process.env.MONGO_URL as string
export const PORT = process.env.PORT
export const JWT__PASSWORD = process.env.JWT__PASSWORD as string
