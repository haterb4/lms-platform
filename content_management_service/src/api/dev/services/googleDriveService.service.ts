import fs from 'fs';
import { drive_v3, google } from 'googleapis';
import log from '../../../config/Logger';


class GoogleDriveService {
  private driveClient: drive_v3.Drive;

  constructor(clientId: string, clientSecret: string, redirectUri: string, refreshToken: string) {
    this.driveClient = this.createDriveClient(clientId, clientSecret, redirectUri, refreshToken);
  }

  private createDriveClient(clientId: string, clientSecret: string, redirectUri: string, refreshToken: string) {
      const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

      client.setCredentials({ refresh_token: refreshToken });

      return google.drive({
        version: 'v3',
        auth: client,
      });

  }

  async createFolder(folderName: string): Promise<drive_v3.Schema$File> {
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    try {
      const response = await this.driveClient.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });

      return response.data;
    } catch (err: any) {
      log.error('Erreur lors de la création du dossier :'+err.message);
      throw err;
    }
  }

  async createSubFolder(parentFolderId: string[], folderName: string){
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId
    };

    try {
      const response = await this.driveClient.files.create({
        requestBody: fileMetadata,
        fields: 'id',
      });

      return response.data;
    } catch (err: any) {
      log.error('Erreur lors de la création du dossier :'+err.message);
      throw err;
    }
  }

  async listFiles(parentFolderId: string){
    try {
      const { data } = await this.driveClient.files.list({
        q: `'${parentFolderId}' in parents`,
        fields: 'files(id, name, mimeType)',
      });
  
      return data.files;
    } catch (error: any) {
      log.error('Error listing files:', error.message);
      throw error;
    }
  }

  async serchSubfolder(parentFolderId: string, subfolderName: string): Promise<drive_v3.Schema$File | null>{
    try {
      const files = await this.listFiles(parentFolderId);
      
      if(!files){
        return null
      }
      const subfolder = files.find(file => file.name === subfolderName && file.mimeType === 'application/vnd.google-apps.folder');
  
      if (subfolder) {
        log.info(`Found subfolder '${subfolderName}' with ID: ${subfolder.id}`);
        return subfolder
      } else {
        log.error(`Subfolder '${subfolderName}' not found in the parent folder.`);
        return null
      }
    } catch (error: any) {
      console.error('Error finding subfolder:'+error.message);
      return null
    }
  }
  async searchFolder(folderName: string): Promise<drive_v3.Schema$File | null> {
    try {
      const response = await this.driveClient.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
        fields: 'files(id, name)',
      });

      return response.data.files ? response.data.files[0] : null;

    } catch (err: any) {
      log.error('Erreur lors de la recherche du dossier :'+err.message);
      throw err;
    }
  }

  async saveFile(fileName: string, filePath: string, fileMimeType: string, folderId?: string): Promise<drive_v3.Schema$File> {
    try {
      const response = await this.driveClient.files.create({
        requestBody: {
          name: fileName,
          mimeType: fileMimeType,
          parents: folderId ? [folderId] : [],
        },
        media: {
          mimeType: fileMimeType,
          body: fs.createReadStream(filePath),
        },
        fields: 'id',
      });

      return response.data;
    } catch (err: any) {
      log.error('Erreur lors de l\'enregistrement du fichier :'+err.message);
      throw err;
    }
  }

  async downloadFile(fileId: string, destinationPath: string){
    try {
  
      const { data } = await this.driveClient.files.get({
        fileId,
        alt: 'media',
      }, { responseType: 'stream' });
  
      const dest = fs.createWriteStream(destinationPath, { flags: 'a' });
      data
        .on('end', () => {
          log.info(`File downloaded to: ${destinationPath}`);
        })
        .on('error', err => {
          log.error('Error downloading file:', err.message);
        })
        .pipe(dest);
    } catch (error: any) {
      log.error('Error downloading file:', error.message);
      throw error;
    }
  }
}

export default GoogleDriveService;
