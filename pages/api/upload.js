// pages/api/upload.js
import { v2 as cloudinary } from "cloudinary";
import { createRouter } from "next-connect";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }); // memory me file hold hogi

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const apiRoute = createRouter({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// ----------- Upload to Cloudinary -----------
apiRoute.use(upload.single("file"));

apiRoute.post(async (req, res) => {
  try {
    const fileStr = req.file.buffer.toString("base64");
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      { folder: "blogs" } // optional: Cloudinary folder
    );

    res.status(200).json({ imageUrl: uploadResponse.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------- Delete from Cloudinary -----------
apiRoute.delete(async (req, res) => {
  try {
    const { imagePath } = req.query; // frontend se pura url aayega
    if (!imagePath) return res.status(400).json({ error: "No image path provided" });

    // URL se public_id nikalna padega
    const parts = imagePath.split("/");
    const fileWithExt = parts[parts.length - 1];
    const publicId = "blogs/" + fileWithExt.split(".")[0];

    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const config = {
  api: { bodyParser: false },
};

export default apiRoute.handler();
