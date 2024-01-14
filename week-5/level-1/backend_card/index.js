import app from './app.js'
import connectDb from './db/index.js'
import { config } from 'dotenv'
config();

const PORT = process.env.PORT
app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`)
        connectDb()
    } catch (e) {
        console.log("Couldn't connect to server");
    }
})