import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Basic Validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        // Create new user
        const user = new User({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false,
        });
        await user.save();

        res.status(201).json({ message: "User registered successfully." , user: { _id: user._id, username: user.username, email: user.email }});
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        // validate input
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // update loggedIn status
        // user.loggedIn = true;
        res.status(200).json({ message: "User logged in successfully.", user: { _id: user._id, username: user.username, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

const LogoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        
        // validate input
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }
        // check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        // update loggedIn status
        // user.loggedIn = false;
        res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

export { registerUser, loginUser, LogoutUser };