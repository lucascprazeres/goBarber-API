import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const hash = crypto.randomBytes(10).toString('hex');

      const filename = `${hash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
