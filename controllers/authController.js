import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";


// REGISTER
export const register = async (req, res) => {

    const { name, email, password } = req.body;

    // Check required data
    if (!name || !email || !password) {
        throw new AppError("All fields are required", 400);
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("Email already registered", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};


// LOGIN
export const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError(
            "Email and password are required",
            400
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};