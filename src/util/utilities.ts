import fs from "fs";
import path from "path";
import { UPLOAD_DIR } from "../config";
import { ErrorType } from "../types/types";

// Returns extension from filename
export const getFileExtension = (filename: string) => {
    return filename.split(".").pop();
};

// Removes extension from filename
export const getFilename = (filename: string) => {
    return filename.split(".").shift();
};

/* Search a file according to the UUID
 * if found returns the full path
 */
export const searchFile = (searched: string): string | null => {
    const fileFolder = searched.substr(0, 3);
    const folder = path.join(__dirname, "/../../", UPLOAD_DIR, fileFolder);
    try {
        const files = fs.readdirSync(folder);
        const filename = files.find((f) => f.startsWith(searched));
        if (filename) {
            return path.join(folder, filename);
        } else {
            return null;
        }
    } catch {
        return null;
    }
};

export function errorResponse(code: number, message: string): ErrorType {
    return {
        code, message
    } as ErrorType;
}
