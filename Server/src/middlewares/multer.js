import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/documents");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.fieldname + path.extname(file.originalname)
    );
  },
});

const imageFileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const documentFileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Error: PDF Files Only!");
  }
};

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
}).single("Image");

export const uploadDocuments = multer({
  storage: documentStorage,
  fileFilter: documentFileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([
  { name: "aadharCard", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
]);
