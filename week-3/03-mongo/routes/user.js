const { Router } = require("express");
const userMiddleware = require("../middleware/admin");
const { User, Course } = require("../db/index")
const zod = require("zod")
const router = Router();

const correctUsername = zod.string().email()
const correctPassword = zod.string().min(8)

router.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const usernameResponse = correctUsername.safeParse(username)
    const passwordResponse = correctPassword.safeParse(password)

    if (!usernameResponse.success || !passwordResponse.success) {
        res.status(400).send("All fields are required!")
    }

    const existingUser = User.findOne({ username })
    if (!existingUser) {
        res.status(400).send("User already exists")
    }

    const user = await User.create({
        username,
        password
    })

    await user.save()

    if (!user) {
        res.status(400).json({
            success: false,
            message: "User not created"
        })
    }

    res.status(200).json({
        success: true,
        message: "User created successfully!"
    })
});


router.get('/courses', async (req, res) => {
    const course_details = await Course.find({})

    if (!course_details) {
        res.status(400).send("Could not find course details")
    }

    res.status(200).json({
        success: true,
        message: "Courses fetched successfully!",
        courses: course_details
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId
    const username = req.headers.username

    await User.updateOne({
        username: username,
    }, {
        '$push': {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.find({
        username: req.headers.username
    })

    const purchasedCourses = await Course.find({
        _id: {
            '$in': user.purchasedCourses
        }
    })

    if (!purchasedCourses) {
        res.status(400).json({
            success: false,
            message: "Could not fetch courses"
        })
    }

    res.json({
        success: true,
        message: "Courses fetched successfully!",
        courses: purchasedCourses
    })
});

module.exports = router