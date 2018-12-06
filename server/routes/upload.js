const express = require("express");
const isAuthed = require("../middlewares/authChecker");
const awsS3 = require("../repository/aws-s3");

const router = express.Router();

router.post("/", isAuthed, awsS3.upload);

module.exports = router;
