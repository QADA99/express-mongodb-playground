import mime from 'mime-types';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};
export const convertBytes = function (bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes == 0) {
    return 'n/a';
  }
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  if (i == 0) {
    return bytes + ' ' + sizes[i];
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

export const validateFile = (file: Express.Multer.File, extentions: string[], minSize: number, maxSize: number): string[] => {
  const errors: string[] = [];
  if (file.size <= minSize || file.size > maxSize) {
    errors.push(`Invalid size for ${file.originalname} should be between [${convertBytes(minSize)}-${convertBytes(maxSize)}]`);
  }
  const ext = mime.extension(file.mimetype);
  if (!ext || !extentions.includes(ext)) {
    errors.push(`Invalid file type for ${file.originalname} should be csv,xlsx`);
  }
  return errors;
};
