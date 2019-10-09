import fs from "fs";
import { searchFile } from "../util/utilities";

export class FileService {
    // Returns fullpath if found
    public static getFile(id: string): string {
        return searchFile(id);
    }

    /* Returns true if found and deleted
     * false in other case
     */
    public static deleteFile(id: string): boolean {
        const filePath = searchFile(id);
        if (filePath) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    }
}
