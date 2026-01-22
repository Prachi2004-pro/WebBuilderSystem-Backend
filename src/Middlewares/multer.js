const multer = require("multer");
const storage = multer.memoryStorage();

module.exports = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});