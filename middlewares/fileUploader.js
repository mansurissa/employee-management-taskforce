import path from 'path';

const fileUpload = (req, res, next) => {
  const managerImage = req.files.image;
  const imageUrl = path.join(
    __dirname,
    '..',
    '..',
    `/uploads/${new Date().toISOString() + managerImage.name}`
  );
  managerImage.mv(imageUrl, (err) => {
    if (err) {
      console.log(err);
    }
  });
  req.image = imageUrl;
  next();
};
export default fileUpload;
