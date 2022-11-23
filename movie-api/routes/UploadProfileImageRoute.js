import express from "express";
const router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

router.post("/profile", upload.single("file"), (req, res) => {
  const file = req.file;
  try {
    if (file) {
      res.status(200).json(file);
    } else {
      res.status(404).json("Can't get file from client");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
