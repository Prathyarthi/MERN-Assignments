const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index")
const zod = require("zod")
const router = Router();

const correctUsername = zod.string().email()  
const correctPassword = zod.string().min(8)

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const usernameResponse = correctUsername.safeParse(username)
    const passwordResponse = correctPassword.safeParse(password)

    if (!usernameResponse.success || !passwordResponse.success) {
        res.status(400).send("All fields are required!")
    }

    const existingAdmin = Admin.findOne({ username })
    if (existingAdmin) {
        res.status(400).send("Admin already exists")
    }

    const admin = await Admin.create({
        username,
        password
    })

    await admin.save()

    if (!admin) {
        res.status(400).json({
            success: false,
            message: "Admin not created"
        })
    }

    res.status(200).json({
        success: true,
        message: "Admin created successfully!"
    })
});


router.post('/courses', adminMiddleware, async (req, res) => {

    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const image = req.body.image

    if (!title || !description || !price || !image) {
        res.status(400).send("All course fields are required!")
    }

    const course = await Course.create({
        title,
        description,
        price,
        image,
    })

    await course.save()

    if (!course) {
        res.status(400).json({
            success: false,
            message: "Failed to create the course."
        })
    }

    res.status(200).json({
        success: true,
        message: "Courses created successfully!",
        courseId: course._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    //     GET /admin/courses
    //   Description: Returns all the courses.
    //   Input: Headers: { 'username': 'username', 'password': 'password' }
    //   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

    const course_details = await Course.find({})
    console.log(course_details);
    if (!course_details) {
        res.status(400).send("Could not find course details")
    }

    res.status(200).json({
        success: true,
        message: "Courses fetched successfully!",
        courses: course_details
    })
});

module.exports = router;