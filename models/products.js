const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
//string is converted into path using path module
const Thumbnail_PATH = path.join("/upload/product/thumbnail");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,

    required: true,
  },


  quantity: {
    type: Number,

  },
  thumbnail: {
    type: String
  }

}, {
  timestamps: true
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("File fetched", file);
    cb(null, path.join(__dirname, "..", Thumbnail_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    console.log("file/file", file);
    cb(null, "thumbnail" + "-" + uniqueSuffix);
  },
});

productSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "thumbnail"
);
productSchema.statics.avatarPath = Thumbnail_PATH;

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

