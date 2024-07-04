const express = require('express');
const router = express.Router();
const db = require('../model/database');
const {
    handleGenerateShortUrl,
    handleRedirectShortId,
    handleGetAllShortId,
    handleGetShortId,
    handleAnalytics,
    handleDeleteShortId,
    handleSignUp,
    handleLogin,
    } = require('../controllers/functions');

router.route("/")
.post(handleGenerateShortUrl)
.get(handleGetAllShortId);

router.route("/api/:shortId")
.get(handleGetShortId);

router.route("/:shortId")
.get(handleRedirectShortId)
.delete(handleDeleteShortId);

router.route("/analytics/:shortId")
.get(handleAnalytics);

router.route("/user/signup")
.post(handleSignUp);

router.route("/user/login")
.post(handleLogin);

module.exports = router;