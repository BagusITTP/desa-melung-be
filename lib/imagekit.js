const ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  // authenticationEndpoint: "http://www.yourserver.com/auth",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

module.exports = imagekit