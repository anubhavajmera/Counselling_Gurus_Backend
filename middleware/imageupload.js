const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
    url: "mongodb://localhost/my_database",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
  
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}${file.originalname}`;
        return filename;
      }
      return {
        bucketName: "photos",
        filename: `${Date.now()}-bezkoder-${file.originalname}`
      };
    }
  });

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;