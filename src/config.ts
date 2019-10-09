import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import uuid = require("uuid");

// Create a new express application instance
export const SERVER = express();

dotenv.config();
export const PORT = process.env.PORT;

const FILES_PATH = process.env.UPLOADS_PATH;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, FILES_PATH);
    },
    filename(req, file, cb) {
        const filename = `${uuid.apply(file.originalname)}.png`;  
        cb(null, filename);
    }
});

const UPLOADER = multer({ storage });

export default UPLOADER;
