const { User } = require("../db/index")
const zod = require('zod')
const correctUsername = zod.string().email()
const correctPassword = zod.string().min(8)

async function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password

    usernameResponse = correctUsername.safeParse(username)
    passwordResponse = correctPassword.safeParse(password)

    if (!usernameResponse.success || !passwordResponse.success) {
        res.status(400).send("All fields are required")
    }

    const existingUser = await User.findOne({ username })
    if (!existingUser) {
        res.status(400).send("User doesn't exist")
    }
    else {
        next()
    }
}

module.exports = userMiddleware;