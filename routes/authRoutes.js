import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
    res.json({
        message: "Register API"
    });
});

export default router;