const express = require("express");
const signupController = require("../controllers/signup");

const router = express.Router();

router.post("/register",signupController.signupUser);

module.exports = router;