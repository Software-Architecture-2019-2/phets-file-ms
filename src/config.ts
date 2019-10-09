import fs from "fs";
import multer from "multer";
import uuid = require("uuid");
import { getFileExtension } from "./util/utilities";

export const PORT = process.env.PORT || 5000;

export const UPLOAD_DIR = process.env.UPLOADS_PATH || "./uploads";

const storage = multer.diskStorage({
    /* Sets destination folder to the one defined in ENV
     * and creates subfolder with first 3 UUID characters
     */
    destination(_, file, cb) {
        file.filename = `${uuid.apply(file.originalname)}`;
        const folder = file.filename.substr(0, 3);
        const path = `${UPLOAD_DIR}/${folder}`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        cb(null, path);
    },
    // Appends extension to filename defined in destination
    filename(_, file, cb) {
        const ext = getFileExtension(file.originalname);
        const filename = `${file.filename}.${ext}`;
        cb(null, filename);
    }
});

export const upload = multer({ storage });
