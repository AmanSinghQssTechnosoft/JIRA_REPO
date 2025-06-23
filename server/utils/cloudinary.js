const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploaddata=async(url,public_id)=>{
 
     const uploadResult = await cloudinary.uploader
       .upload(
           url, {
               public_id: public_id,
           }
       )
       .catch((error) => {
           console.log(error);
       });

   return uploadResult
};

module.exports=uploaddata