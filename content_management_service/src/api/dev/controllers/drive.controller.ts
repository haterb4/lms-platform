import { Request, Response } from "express";
import log from "../../../config/Logger";
import GoogleDriveService from "../services/googleDriveService.service";
import config from "config";
import * as path from 'path';
import * as fs from 'fs';

class DriveController {
    public async uploadFile(req: Request, res: Response){
        log.info("uploading")

        const driveCredentials = config.get<IDRIBVE>("drive")
        const googleDriveService = new GoogleDriveService(
            driveCredentials.GOOGLE_DRIVE_CLIENT_ID,
            driveCredentials.GOOGLE_DRIVE_CLIENT_SECRET,
            driveCredentials.GOOGLE_DRIVE_REDIRECT_URI,
            driveCredentials.GOOGLE_DRIVE_REFRESH_TOKEN,
        );

        const finalPath = path.resolve(__dirname, '../public/spacex-uj3hvdfQujI-unsplash.jpg');
        const folderName = 'Picture';

        if (!fs.existsSync(finalPath)) {
            return res.status(404).send({
                success: false,
                message: "File not found"
            })
        }

        let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
            console.error(error);
            return null;
        });
        
        if (!folder) {
            folder = await googleDriveService.createFolder(folderName);
        }

        if (!folder.id) {
            folder = await googleDriveService.createFolder(folderName);
            return res.status(403).send({
                success: false,
                message: "an error occured while creating folder"
            })
        }

        await googleDriveService.saveFile('SpaceX', finalPath, 'image/jpg', folder.id).catch((error) => {
            console.error(error);
        });

        // Delete the file on the server
        fs.unlinkSync(finalPath);
    }
}

export default DriveController