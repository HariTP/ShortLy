const shortID = require('./shortURL');
const db = require('../model/database');
const userdb = require('../model/users');

handleGenerateShortUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({error: "You need to provide a URL!"});
    }
    const payload = {};
    payload.redirectUrl = body.url;
    if (body.title) payload.title = body.title;
    if (body.customHalf) {
        const ele = await db.findOne({ shortUrl: body.customHalf });
        if (ele) {
            return res.status(400).json({ "error": "Custom half link already used!" });
        } else {
            payload.shortUrl = body.customHalf;
        }
    } else {
        payload.shortUrl = shortID(8);
    }
    payload.visitHistory = [];

    let url = /^https?:\/\//i.test(body.url) ? body.url : 'https://' + body.url ;
    await db.create(payload)
    .then(() => {
        return res.json({id: payload.shortUrl});
    })
    .catch((error) => {
        console.log(error);
        return res.status(500).json({"error": 'Internal Servor error!'});
    })
}

handleRedirectShortId = async (req,res) => {
    const shortId = req.params.shortId;
    db.findOne({
        shortUrl: shortId,
    }).then((data) => {
        if (data) {
            if (!/^http?:\/\//i.test(data.redirectUrl)) {
                res.redirect('http://' + data.redirectUrl);
            } else {
                res.redirect(data.redirectUrl);
            }
            const createdAtDate = data.createdAt; // createdAt is a Date object
            const today = new Date(); // Get today's date
            const differenceInMilliseconds = today - createdAtDate;
            const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
            console.log(differenceInDays);
            const updateObject = {};
            updateObject[`totalClicks.${differenceInDays}`] = 1;
            console.log(updateObject);
            db.findOneAndUpdate({
                shortUrl: shortId,
            },
            { 
                $push: {
                    visitHistory: { 
                        timestamp: Date.now()
                    },
                },
                $inc: updateObject,
            })
            .then(() => {
                return;
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("error updating");
            })
        } else {
            return res.status(400).send("Not found 404!");
        }
    })
    .catch((err) => {
        console.log("redirection error: ", err);
    })
}

handleGetAllShortId = async (req, res) => {
    if (req.query.find) {
        await db.find({
            "$or": [
                { title: { '$regex': req.query.find, '$options': 'i' } },
                { redirectUrl: { '$regex': req.query.find, '$options': 'i' } },
                { shortUrl: { '$regex': req.query.find, '$options': 'i' } }
            ]
        }).then((data) => {
            return res.send(data);
        }).catch((err) => {
            return res.status(404).send("Not found");
        });
    } else {
        const data = await db.find({});
        res.send(data);
    }
}

handleGetShortId = async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const data = await db.findOne({
            shortUrl: shortId
        });
        if (!data && !data.length) {
            return res.status(404).send("not found!!!")
        }
        return res.send(data);
    } catch (error) {
        console.log(error);
    }
}

handleAnalytics = async (req,res) => {
    const shortId = req.params.shortId;
    const data = await db.findOne({
        shortUrl: shortId,
    });
    const date = new Date(data.visitHistory[0].timestamp);
    res.json({
        "total_clicks": data.visitHistory.length,
        "analytics": data.visitHistory
    });
}

handleDeleteShortId = async (req,res) => {
    const shortId = req.params.shortId;
    const deleted_data = await db.findOneAndDelete({
        shortUrl: shortId,
    })
    if (deleted_data) {
        res.status(200).json({"message": "successfully deleted"});
    } else {
        res.status(400).json({"error": "provide a valid short url!"});
    }
}

handleSignUp = async (req, res) => {
    const user = req.body;
    if (!user || !user.name || !user.email || !user.password) {
        return res.status(400).json({"error": "Bad request!!"})
    }

    await userdb.create ({
        name: user.name,
        email: user.email,
        password: user.password,
    });

    return res.status(200).json({"message": "User successfully created."});
}

handleLogin = async (req, res) => {
    const user = req.body;
    if (!user ||  !user.email || !user.password) {
        return res.status(400).json({"error": "Bad request!!"})
    }

    const userdata = await userdb.findOne({
        email: user.email,
    });

    if (userdata && userdata.password == user.password) {
        res.status(200).json({"message": "successful login"});
    } else {
        res.status(401).json({"error": "Invalid credentials!!"});
    }
};

module.exports = {
    handleGenerateShortUrl,
    handleRedirectShortId,
    handleGetAllShortId,
    handleGetShortId,
    handleAnalytics,
    handleDeleteShortId,
    handleSignUp,
    handleLogin
}