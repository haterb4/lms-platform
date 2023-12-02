import { Request, Response } from "express";
import log from "../../../config/Logger";
import GoogleDriveService from "../services/googleDriveService.service";
import config from "config";
import * as path from 'path';
import * as fs from 'fs';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

class DriveController {
    public async uploadFile(req: Request, res: Response){
        const user = res.locals.user.decoded
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const { email } = user

        if(!email || !emailRegex.test(email)){
            return res.status(403).send({
                succes: false,
                message: "Invalid user token"
            })
        }
        let userFolder = `${email}`.replace(/[@.]/g, "")
        try {
            // Récupérer les données du formulaire
            const { videoname, fileType, chunkIndex, totalChunks, mimeType, resfolder } = req.body;

            if(!videoname || !fileType || !chunkIndex || !totalChunks || !mimeType || !resfolder) {
                return res.status(403).send({
                    succes: false,
                    message: "Invalid request"
                })
            }
            const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');
            
            // Construire le chemin de destination pour le chunk
            const chunkPath = path.join(uploadDir, `${videoname.split(" ").join("_")}_chunk_${chunkIndex}`);
        
            // Sauvegarder le chunk reçu
            fs.writeFileSync(chunkPath, (req.file as Express.Multer.File).buffer);
            
            // Vérifier si tous les chunks ont été reçus
            if (Number(chunkIndex) === Number(totalChunks) - 1) {
                log.info('loading chucks: 100%')

                // C'est le dernier chunk, reconstituer le fichier complet
                const completeFilePath = path.join(uploadDir, `${videoname.split(" ").join("_")}${fileType}`);
                const writeStream = fs.createWriteStream(completeFilePath, { flags: 'a' });
            
                // Concaténer tous les chunks pour reconstituer le fichier complet
                for (let i = 0; i < totalChunks; i++) {
                    const chunkPath = path.join(uploadDir, `${videoname.split(" ").join("_")}_chunk_${i}`);
                    const chunkBuffer = fs.readFileSync(chunkPath);
                    writeStream.write(chunkBuffer);
                    // Supprimer le chunk après utilisation
                    fs.unlinkSync(chunkPath);
                    log.info('composing file: '+Math.ceil(((i+1)*100)/totalChunks)+'%')
                }
        
                writeStream.end();
              
                const driveCredentials = config.get<IDRIBVE>("drive")
                const googleDriveService = new GoogleDriveService(
                    driveCredentials.GOOGLE_DRIVE_CLIENT_ID,
                    driveCredentials.GOOGLE_DRIVE_CLIENT_SECRET,
                    driveCredentials.GOOGLE_DRIVE_REDIRECT_URI,
                    driveCredentials.GOOGLE_DRIVE_REFRESH_TOKEN,
                );

                const folderName = 'GdriveApiService';

                log.info("uploading file to the drive")
                
                log.info('checking target foelder on drive')
                let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
                    console.error(error);
                    return null;
                });
                

                if (!folder) {
                    log.error('target folder does not exist on drive')
                    log.info('creating target folder on the drive')
                    folder = await googleDriveService.createFolder(folderName);
                }

                if (!folder.id) {
                    log.error('could not create target folder on the drive')
                    return res.status(403).send({
                        success: false,
                        message: "an error occured while creating folder"
                    })
                }
                
                log.info("checking user folder")
                let subFolderUser = await googleDriveService.serchSubfolder(folder.id, userFolder).catch((error) => {
                    console.error(error);
                    return null;
                });

                if (!subFolderUser) {
                    log.error('user folder does not exist on drive')
                    log.info('creating user folder on the drive')
                    const parent = [folder.id]
                    subFolderUser = await googleDriveService.createSubFolder(parent, userFolder);
                }

                if (!subFolderUser) {
                    log.error('could not create user folder on the drive')
                    return res.status(403).send({
                        success: false,
                        message: "an error occured while creating user folder"
                    })
                }

                if (!subFolderUser.id) {
                    log.error('could not create user folder on the drive')
                    return res.status(403).send({
                        success: false,
                        message: "an error occured while creating user folder"
                    })
                }


                log.info("checking resource folder")
                let subFolderRessource = await googleDriveService.serchSubfolder(subFolderUser.id, `${resfolder}s`).catch((error) => {
                    console.error(error);
                    return null;
                });
                
                if (!subFolderRessource) {
                    log.error('user folder does not exist on drive')
                    log.info('creating resource folder on the drive')
                    const parent = [subFolderUser.id]
                    subFolderRessource = await googleDriveService.createSubFolder(parent, resfolder);
                }

                if (!subFolderRessource) {
                    log.error('could not create resource folder on the drive')
                    return res.status(403).send({
                        success: false,
                        message: "an error occured while creating resource folder"
                    })
                }

                if(!subFolderRessource.id){
                    log.error('could not create user folder on the drive')
                    return res.status(403).send({
                        success: false,
                        message: "an error occured while creating user folder"
                    })
                }

                log.info("checking user folder")

                log.info('target folder created on the drive')
                log.info("saving the file on the drive")

                if (!fs.existsSync(completeFilePath)) {
                    log.error("Local file dosn't exist")
                    log.error(completeFilePath)
                    return res.status(404).send({
                        success: false,
                        message: "File not found"
                    })
                }

                const fileUrl = await googleDriveService.saveFile(videoname, completeFilePath, mimeType, subFolderRessource.id).catch((error) => {
                    log.error(error);
                });

                if(!fileUrl){
                    log.error("could not save the file on the drive ")
                    return res.status(302).send({
                        success: false,
                        message: "could not upload file on the drive"
                    })
                }

                log.info("file saved on the drive")
                // Delete the file on the server
                log.info("deleting local file")
                try {
                    fs.unlinkSync(completeFilePath);
                } catch (error) {
                    log.error("delete local file failed")
                }
                log.info("local file deleted")

                log.info("file uploaded to the drive")
                return res.status(200).send({
                    success: true,
                    file: fileUrl
                })
              // Répondre avec un statut 200 pour indiquer que tout s'est bien passé
            } else {
              // Répondre avec un statut 200 pour indiquer que le chunk a été reçu
              log.info('loading chucks: '+ Math.ceil(((Number(chunkIndex) + 1) *100)/Number(totalChunks))+"%")
              res.status(200).send('Chunk reçu avec succès');
            }
          } catch (error) {
            log.error('Erreur lors de la gestion du fichier'+ error);
            res.status(500).send('Erreur lors de la gestion du fichier');
        }
    }

    public async downloadFile(req: Request, res: Response){
        const { id } = req.params
        const { name } = req.body

        log.info(name)
        if(!id || !name){
            return res.status(403).send({
                succes: false,
                message: "Invalid request missing fileds id or name"
            })
        }

        const user = res.locals.user.decoded
        const { email } = user
        let userFolder = `${email}`.replace(/[@.]/g, "")

        const donwnloadDir = path.join(__dirname, '..', '..', '..', 'downloads');
        const userdir = path.join(donwnloadDir, userFolder)
        const filepath = path.join(userdir, "book.pdf")

        const driveCredentials = config.get<IDRIBVE>("drive")
        const googleDriveService = new GoogleDriveService(
            driveCredentials.GOOGLE_DRIVE_CLIENT_ID,
            driveCredentials.GOOGLE_DRIVE_CLIENT_SECRET,
            driveCredentials.GOOGLE_DRIVE_REDIRECT_URI,
            driveCredentials.GOOGLE_DRIVE_REFRESH_TOKEN,
        );
        if(!fs.existsSync(donwnloadDir)){
            try {
                fs.mkdirSync(donwnloadDir)
            } catch (error: any) {
                log.error(error.message)
                return res.sendStatus(505)
            }
        }
        log.info("download dir checked")
        if(!fs.existsSync(userdir)){
            try {
                fs.mkdirSync(userdir)
            } catch (error: any) {
                log.error(error.message)
                return res.sendStatus(505)
            }
        }
        log.info("user dir checked")
        if(!fs.existsSync(filepath)){
            try {
                fs.createWriteStream(filepath)
            } catch (error: any) {
                log.error(error.message)
                return res.sendStatus(505)
            }
        }
        log.info("file dir checked")
        
        log.info("downloading")
        await googleDriveService.downloadFile(id, filepath)
        log.info("downloaded")
        return res.sendStatus(200)
    }

    public async streamVideo(req: Request, res: Response){
        const { id } = req.params
        const range = req.headers.range
        if(!range){
            return res.status(400).send({
                success: false,
                message: 'range is required'
            });
        }

        const videoPath = path.join(__dirname, '..', '..', '..', 'downloads');
        const userPath = path.join(videoPath, 'haterb2803gmailcom');
        const filePath = path.join(userPath, 'course_video.mp4');

        const videoSize = fs.statSync(filePath).size;

        const chunckSize = 10**16;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + chunckSize, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4" 
        }
        res.writeHead(206, headers)

        const videoStream = fs.createReadStream(filePath, { start, end })
        videoStream.pipe(res)
    }
}

export default DriveController