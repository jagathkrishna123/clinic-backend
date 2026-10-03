import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const getMyProfile = async (req, res) => {

    const user = await User.findById(req.user.userId)
        .select("-password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json({
        success: true,
        user
    });
};