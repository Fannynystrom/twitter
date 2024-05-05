import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profilePictures/");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload-profile-picture",
  upload.single("profilePicture"),
  (req, res) => {
    // Here you can handle the uploaded file, save it to storage, update user profile, etc.
    res.sendStatus(200);
  }
);

export default router;
