const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const URL = require("./models/url");

var cors = require('cors')

const app = express();
const PORT = 3001;
app.use(cors({
    origin: 'http://localhost:5173'
}));

connectToMongoDB("mongodb://localhost:27017/shortURL")
    .then(() => console.log("MongoBD Connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use("/url", urlRoute)
app.use("/user", userRoute);


app.get("/url/:shortid", async (req, res) => {
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        {
            shortid,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));