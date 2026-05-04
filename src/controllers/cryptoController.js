const Crypto = require("../models/Crypto");

const getAllCrypto = async (_req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: cryptos });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cryptocurrencies.", error: error.message });
  }
};

const getTopGainers = async (_req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ change24h: -1 });
    return res.status(200).json({ data: cryptos });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch top gainers.", error: error.message });
  }
};

const getNewListings = async (_req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: cryptos });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch new listings.", error: error.message });
  }
};

const createCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (
      name === undefined ||
      symbol === undefined ||
      price === undefined ||
      image === undefined ||
      change24h === undefined
    ) {
      return res.status(400).json({
        message: "name, symbol, price, image, and change24h are all required.",
      });
    }

    const newCrypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h,
    });

    return res.status(201).json({ message: "Crypto created successfully.", data: newCrypto });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create crypto.", error: error.message });
  }
};

module.exports = {
  getAllCrypto,
  getTopGainers,
  getNewListings,
  createCrypto,
};
