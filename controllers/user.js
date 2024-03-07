const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        await User.create({
            name,
            email,
            password,
        });
        console.log("user created")
        return res.json({ msg: "Signed Up" })
    }
    catch {
        return res.status(400).json({ msg: "email already exists" })
    }
}


async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            res.status(401).json({ error: "Inavaild username or password" });
        }

        sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId, { httpOnly: true, secure: true, sameSite: "strict" });

        return res.status(200).json(sessionId);
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}