

import bcrypt from "bcrypt";
import crypto from "crypto";
import httpStatus from "http-status";
import { User } from "../models/users.model.js";
import { Meeting } from "../models/meeting.model.js";

// Register
const register = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({ message: "Please provide name, username, and password" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password should be at least 6 characters long" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(409).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, password: hashedPassword });
        await newUser.save();

        return res.status(httpStatus.CREATED).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong: " + error.message });
    }
};

// Login
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Please provide both username and password" });

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid username or password" });

        const token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        await user.save();

        return res.status(httpStatus.OK).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong: " + error.message });
    }
};

// Get User History
const getUserHistory = async (req, res) => {
    const { token } = req.body; 

    if (!token) return res.status(400).json({ message: "Token is required" });

    try {
        const user = await User.findOne({ token });
        if (!user) return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });

        const meetings = await Meeting.find({ user_id: user.username });
        return res.status(httpStatus.OK).json(meetings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong: " + error.message });
    }
};

// Add to History
const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;
    if (!token || !meeting_code) return res.status(400).json({ message: "Token and meeting code are required" });

    try {
        const user = await User.findOne({ token });
        if (!user) return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });

        const newMeeting = new Meeting({ user_id: user.username, meetingCode: meeting_code });
        await newMeeting.save();

        return res.status(httpStatus.CREATED).json({ message: "Added meeting code to history" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong: " + error.message });
    }
};

export { register, login, getUserHistory, addToHistory };
