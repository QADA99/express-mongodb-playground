import multer from 'multer';
import { getUUID } from '@/utils/uuid';
import path from 'path';
const multerMiddleware = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/tmp');
    },
    filename: function (req, file, cb) {
      cb(null, getUUID() + path.extname(file.originalname));
    },
  }),
});

export default multerMiddleware;
