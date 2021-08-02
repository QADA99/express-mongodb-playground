import { RequestHandler } from 'express';

const uploadMiddleware = (): RequestHandler => {
  return (req, res, next) => {
    if (req.files) {
      for (const key in req.files) {
        if (Object.prototype.hasOwnProperty.call(req.files, key)) {
          const element = req.files[key];
          req.body[`multer_${key}`] = element;
        }
      }
    }
    next();
  };
};

export default uploadMiddleware;
