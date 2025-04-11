import * as dotenv from 'dotenv';
import express, { json } from "express";
import mongoose, { connect } from "mongoose";
import authRouter from "./routes/auth-route.js";
// import fileRouter from "./routes/file-routes";
import fileUpload from "express-fileupload";
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express()
dotenv.config();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(fileUpload({}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.static('./static'))
app.use(cookieParser())
app.use("/api/auth", authRouter);
// app.use("/api/files", fileRouter);
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then(() => console.log('DB connected'))
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
          });
    } catch (e) {
        console.log(e);
        
    }
}

start()