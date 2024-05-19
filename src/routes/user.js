const express = require("express");
//const cors = require("cors");
const authMiddleware = require("../utils/authMiddleware");

//we import the controllers
const userController = require("../controllers/user");


const router = express.Router();

//router.use(cors());
router.use(authMiddleware.authenticateToken);

router.get("/users", userController.getUsers);
router.get("/user", userController.getUser);
router.post("/user/movement", userController.createMovement);

module.exports = router;