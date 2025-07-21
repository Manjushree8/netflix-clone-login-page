import express from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(cors({
    origin: [
        "https://netflixclone-orcin-nine.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true
}));

// In-memory users
let users = [];


app.get("/", (req, res) => {
    res.send("Netflix Clone Backend running 🚀");
});


app.post("/signup", (req, res) => {
    console.log("Received signup request:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    users.push({ email, password });
    console.log("Current users:", users);
    return res.status(201).json({ success: true, message: "User created successfully" });
});

// Login route
app.post("/login", (req, res) => {
    console.log("Received login request:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ success: false, message: "Account not found. Please sign up." });
    }

    if (user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid password" });
    }

    return res.status(200).json({ success: true, message: "Login successful" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
