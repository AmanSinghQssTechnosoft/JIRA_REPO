// utils/cloudinaryUploader.js
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPdfBufferToCloudinary = (pdfBuffer, public_id) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "pdfs",
        public_id
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
  });
};

module.exports = uploadPdfBufferToCloudinary;
