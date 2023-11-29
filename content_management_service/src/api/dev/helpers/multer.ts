import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, 'uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      const extname = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

const upload = multer({ storage: storage });
export default upload