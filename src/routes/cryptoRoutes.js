const express = require("express");
const {
  createCrypto,
  getAllCrypto,
  getNewListings,
  getTopGainers,
} = require("../controllers/cryptoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllCrypto);
router.get("/gainers", getTopGainers);
router.get("/new", getNewListings);
router.post("/", protect, createCrypto);

module.exports = router;
