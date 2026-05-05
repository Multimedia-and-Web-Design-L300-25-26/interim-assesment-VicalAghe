require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection during startup/runtime:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception during startup/runtime:", error);
});

const startServer = async () => {
  try {
    console.log("Starting server...", {
      nodeEnv: process.env.NODE_ENV || "development",
      hasMongoUri: Boolean(process.env.MONGODB_URI || process.env.MONGO_URI),
      hasJwtSecret: Boolean(process.env.JWT_SECRET),
      port: PORT,
    });
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
