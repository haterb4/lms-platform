import fs from 'fs';
import { drive_v3, google } from 'googleapis';


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
      console.error('Erreur lors de la création du dossier :', err.message);
      throw err;
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
      console.error('Erreur lors de la recherche du dossier :', err.message);
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
      console.error('Erreur lors de l\'enregistrement du fichier :', err.message);
      throw err;
    }
  }
}

export default GoogleDriveService;
