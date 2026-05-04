const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "MongoDB connection string missing. Set MONGODB_URI (or MONGO_URI) in your .env file."
    );
  }

  // `family: 4` prefers IPv4; broken IPv6 routes to Atlas often surface as TLS "internal error".
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15_000,
    family: 4,
  });
  console.log("MongoDB connected successfully.");
};

module.exports = connectDB;
