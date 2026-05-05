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
    // Render deploys can fail fast if Atlas IP allowlisting hasn’t propagated yet.
    // Retry a few times before giving up.
    const maxAttempts = 8;
    const sleepMs = 5000;
    let lastError = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await connectDB();
        lastError = null;
        break;
      } catch (e) {
        lastError = e;
        console.error(`MongoDB connection attempt ${attempt}/${maxAttempts} failed:`, e.message);
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, sleepMs));
        }
      }
    }

    if (lastError) {
      console.error(
        "MongoDB connection still failing after retries. Starting server anyway; endpoints requiring DB will fail until DB is reachable.",
        lastError.message
      );
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
