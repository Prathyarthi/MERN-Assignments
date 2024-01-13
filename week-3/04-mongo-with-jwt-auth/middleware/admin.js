// Middleware for handling auth
const { Admin } = require("../db/index")
const zod = require('zod')

const correctUsername = zod.string().email()
const correctPassword = zod.string().min(8)
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password

    usernameResponse = correctUsername.safeParse(username)
    passwordResponse = correctPassword.safeParse(password)

    if (!usernameResponse.success || !passwordResponse.success) {
        res.status(400).send("All fields are required")
    }

    const existingAdmin = await Admin.findOne({ username })
    if (!existingAdmin) {
        res.status(400).send("Admin doesn't exist")
    }
    else {
        next()
    }
}

module.exports = adminMiddleware;