const URL = require("../models/url");
const UID = require("uid-safe");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    console.log(body)
    const shortid = await UID(8);
    console.log("shortid : ", shortid);

    try {
        await URL.create({
            shortid: shortid,
            redirectURL: body.url,
            visitHistory: [],
        }).then(() => console.log("url created in mongodb")).catch(err => console.error("Error creating URL:", err));
        return res.status(200).json({ uid: shortid });

    }
    catch (error) {
        console.error("Error during Shortening:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
}

async function handleGetAnalytics(req, res) {
    const shortid = req.params.shortid;
    const result = await URL.findOne({ shortid });
    //console.log(result);
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}