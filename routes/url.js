const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");


const router = express.Router();

router
    .route("/")
    .post(handleGenerateNewShortURL);

router
    .route("/analytics/:shortid",)
    .get(handleGetAnalytics);

module.exports = router;