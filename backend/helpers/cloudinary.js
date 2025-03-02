import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadHelper(filePath) {
  try {
    const media = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return media;
  } catch (error) {
    throw new Error("cannot upload media to cloudinary.");
  }
}

async function deleteHelper(public_id) {
  try {
    await cloudinary.v2.uploader.destroy(public_id);
  } catch (error) {
    throw new Error("cannort delete file from cloudinary");
  }
}

export { uploadHelper, deleteHelper };
