const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes"); // ✅ FIXED

dotenv.config({path: "../.env"});

const app = express();
 
app.use(cors({
 origin: "https://contacts-management-ecc4.onrender.com",
 credentials: true 
}));
app.use(express.json());
app.use("/api", contactRoutes); 


console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose 
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err)); 
