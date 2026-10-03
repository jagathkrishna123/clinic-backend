import Doctor from "../models/Doctor.js";
import AppError from "../utils/AppError.js";


// CREATE DOCTOR
export const createDoctor = async (req, res) => {

    const { name, email, specialization, experience } = req.body;

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
        throw new AppError("Doctor already exists", 409);
    }

    const doctor = await Doctor.create({
        name,
        email,
        specialization,
        experience
    });

    res.status(201).json({
        success: true,
        message: "Doctor created successfully",
        doctor
    });
};


// GET ALL DOCTORS
export const getDoctors = async (req, res) => {

    const doctors = await Doctor.find();

    res.status(200).json({
        success: true,
        count: doctors.length,
        doctors
    });
};


// GET SINGLE DOCTOR
export const getDoctor = async (req, res) => {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
        throw new AppError("Doctor not found", 404);
    }

    res.status(200).json({
        success: true,
        doctor
    });
};


// UPDATE DOCTOR
export const updateDoctor = async (req, res) => {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
        throw new AppError("Doctor not found", 404);
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        message: "Doctor updated successfully",
        doctor: updatedDoctor
    });
};


// DELETE DOCTOR
export const deleteDoctor = async (req, res) => {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
        throw new AppError("Doctor not found", 404);
    }

    await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Doctor deleted successfully"
    });
};