import multer from 'multer';
import path from 'path';
import fs from 'fs'
import log from '../../../config/Logger';

const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  log.info("upload folder created")
}


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 1024 },
});

export default upload