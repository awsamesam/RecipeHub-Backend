const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const db = require("./config/db");
const path = require("path");
const { NotFound, error } = require("./Middleware/Error");
// Error Middleware

// connect to dataBase
app.use(cors());
// تفعيل قراءة الـ JSON والـ URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// photo
app.use("/images", express.static(path.join(__dirname, "public", "images")));
//Router
app.use("/api/recipe", require("./Routes/recipe"));
app.use("/api/user", require("./Routes/user"));

// Error Middleware
app.use(NotFound);
app.use(error);
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
