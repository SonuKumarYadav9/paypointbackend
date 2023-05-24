const express = require("express");
const router = express.Router();

//* Requiring Middlwares
// const { isAdmin, mid } = require("../middlewares/auth");

//* Requiring Controller
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const middleware = require("../middlewares/auth");

const ApiControllers = require('../API/MobileRecharge')
const OperatorFetchNew = require("../API/OperatorFetchApi")

//* Destructuring All Controllers
const {MobilePlan,recharge} = ApiControllers
const {operatorFetch} = OperatorFetchNew


const {
  createAdmin,
  adminLogin,
  getAdmin,
  getAllMasterByAdmin,
  getAllRetailersByAdmin,
  getAllDistributersByAdmin,
} = adminController;
const {
  createMaster,
  createDistributer,
  createRetailer,
  getUserById,
  userLogin,
  getAllMaster,
  getAllDistributers,
} = userController;
const { authMiddleware, isUser } = middleware;

//* Test Api
router.get("/", (req, res) => res.send("Hello World!"));

// //* Resiterb Admin APi
router.post("/register/admin", createAdmin);

//* Register Users Api
router.post("/register/master", authMiddleware, createMaster);
router.post("/register/distributer", authMiddleware, createDistributer);
router.post("/register/retailer", authMiddleware, createRetailer);

//* Login Api of Admin Users
router.post("/login/admin", adminLogin);
router.post("/login/user", userLogin);

//*Get API
router.get("/admin/:id", authMiddleware, getAdmin);
router.get("/user/:id", authMiddleware, getUserById);
router.get("/masters", authMiddleware, getAllMaster);
router.get("/distributers", authMiddleware, getAllDistributers);
router.get("/retailers", authMiddleware, getAllDistributers);
// router.get("/retailers", getAllDistributers);


//*Get API For Admin
router.get("/admin-masters", authMiddleware, getAllMasterByAdmin);
router.get("/admin-distributers", authMiddleware, getAllDistributersByAdmin);
router.get("/admin-retailers", authMiddleware, getAllRetailersByAdmin);

//Recharge Plan

router.post("/mobile-plans", authMiddleware, MobilePlan );
router.get("/operator-fetch",authMiddleware, operatorFetch );
router.get("/mobile-recharge", recharge );

module.exports = router;
