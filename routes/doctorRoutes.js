import express from "express";

import {
    createDoctor,
    getDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor
} from "../controllers/doctorController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeMiddleware.js";
import validate from "../middleware/validate.js";
import asyncHandler from "../utils/asyncHandler.js";

import { doctorSchema } from "../validators/doctorValidator.js";

const router = express.Router();


// Anyone logged in can view doctors
router.get(
    "/",
    authMiddleware,
    asyncHandler(getDoctors)
);


// Anyone logged in can view one doctor
router.get(
    "/:id",
    authMiddleware,
    asyncHandler(getDoctor)
);


// Only admin can create doctor
router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    validate(doctorSchema),
    asyncHandler(createDoctor)
);


// Only admin can update doctor
router.put(
    "/:id",
    authMiddleware,
    authorize("admin"),
    asyncHandler(updateDoctor)
);


// Only admin can delete doctor
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    asyncHandler(deleteDoctor)
);

export default router;