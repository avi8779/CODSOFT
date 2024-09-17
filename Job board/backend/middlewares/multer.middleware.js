import path from "path";
import multer from "multer";

// Define the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Define the file filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);

  if (
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".webp" &&
    ext !== ".png" &&
    ext !== ".mp4" &&
    ext !== ".pdf"
  ) {
    cb(new Error(`Unsupported file type! ${ext}`), false);
    return;
  }

  cb(null, true);
};

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max file size
  fileFilter: fileFilter,
});

export default upload;
