const skillRoutes = require("./routes/skills.js");
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware")
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes")
const interviewRoutes = require('./routes/interview');
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController")
const { protect } = require("./middlewares/authMiddleware")
const achievementsRoutes = require("./routes/achievements");

const app = express();

// Middleware to handle cors //

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB()

// Middleware //
app.use(express.json())

// Routes //

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);


app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));



//Mock-interview routes//
app.use('/api/interview', interviewRoutes);




app.use("/api/interviews", interviewRoutes);


// app.use("/api/skills", skillRoutes);
app.use("/api/skills", require("./routes/skills.js"));



app.use("/api/achievements", achievementsRoutes);


// Start Server //

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

