import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getMyProfile } from "../controllers/userController.js";

const router = express.Router();

router.get(
    "/me",
    authMiddleware,
    asyncHandler(getMyProfile)
);

export default router;