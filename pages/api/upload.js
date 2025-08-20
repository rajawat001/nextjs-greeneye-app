// pages/api/upload.js
import { createRouter } from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), '/public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

const apiRoute = createRouter({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// ----------- Upload -----------
apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl: filePath });
});

// ----------- Delete -----------
apiRoute.delete((req, res) => {
  const { imagePath } = req.query; //  `/uploads/...` from frontend 
  if (!imagePath) return res.status(400).json({ error: 'No image path provided' });

  const fullPath = path.join(process.cwd(), '/public', imagePath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    return res.status(200).json({ success: true, message: 'Image deleted' });
  }
  return res.status(404).json({ error: 'File not found' });
});

export const config = {
  api: { bodyParser: false },
};

export default apiRoute.handler();
