const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const zod = require("zod");
const { Admin } = require("../db");
const jwt = require("jsonwebtoken")

const correctUsername = zod.string().email()
const correctPassword = zod.string().min(8)

const jwtSecret = "secret"

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    const usernameResponse = correctUsername.safeParse(username)
    const passwordResponse = correctPassword.safeParse(password)

    if (!usernameResponse.success || !passwordResponse.success) {
        res.status(400).json({
            success: false,
            message: "All fields are required!"
        })
    }

    const adminExists = await Admin.findOne({
        username
    })

    if (adminExists) {
        return res.status(409).json({
            success: false,
            message: "Admin already exits!"
        })
    }

    const admin = await Admin.create({
        username,
        password
    })

    if (!admin) {
        res.status(400).json({
            success: false,
            message: "Admin creation failed!"
        })
    }

    const jwtSignature = jwt.sign({
        username,
        password
    }, jwtSecret)


    await admin.save()
    res.status(200).json({
        success: true,
        message: "Admin created successfully!",
        jwtSignature
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username
    const password = req.headers.password
    const token = req.headers.authorization

    if (!username || !password) {
        res.status(400).json({
            success: false,
            message: "All fields are required!"
        })
    }

    const jwtVerified = jwt.verify({
        token
    }, jwtSecret)

    if (jwtVerified) {
        res.status(200).json({
            success: true,
            message: "You are logged in!"
        })
    }

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;