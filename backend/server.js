const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Authentication routes
const authRoutes = require("./routers/auth");
const bookRoutes = require("./routers/book");


app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);


// Home route
app.get("/", (req, res) => {
    res.send("Library Management System Backend is Running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});