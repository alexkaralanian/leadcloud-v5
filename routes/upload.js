const express = require("express");
const uuid = require("uuid/v1");
const AWS = require("aws-sdk");
const keys = require("../config/keys");
const isAuthed = require("../middlewares/authChecker");

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: keys.AWS_KEY,
  secretAccessKey: keys.AWS_SECRET
});

router.post("/", isAuthed, (req, res) => {
  const userId = req.session.user.toString();
  const componentType = req.body.componentType;
  const componentId = req.body.componentId;
  const key = `${userId}/${componentType}/${componentId}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "leadcloud-v5-user-images",
      ContentType: "image/jpeg",
      Key: key
    },
    (err, url) => res.send({ key, url })
  );
});

module.exports = router;
