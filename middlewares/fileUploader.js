import cloudinary from '../config/cloudnary';

const fileUpload = async (req, res, next) => {
  if (!req.files) return next();
  const { tempFilePath } = req.files.image;
  const { url } = await cloudinary.upload(
    tempFilePath,
    (_, results) => results
  );
  req.image = url;
  return next();
};
export default fileUpload;
