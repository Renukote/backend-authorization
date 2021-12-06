require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
            if (err) return reject(err);
            return resolve(token);
        });
    });
};

module.exports = async (req, res, next) => {
    //? check if the header has a bearer token
    const bearerToken = req?.headers?.authorization;

    //? if the token received is not a bearer token, throw token
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(500).send({
             message: "Please provide a valid token",
              status: "failed" 
            });
    }

    //? else get the user from the token
    const token = bearerToken.split(' ')[1];
    let user;
    try {
        user = await verifyToken(token);
    } 
    catch (e) {
        return res.status(500).send({ 
            message: "please provide a valid token", 
            status: "failed" 
        });
    }

    //? if no user found, throw an err
    if (!user) return res.status(500).send({ 
        message: "please provide a valid token", 
        status: "failed" 
    });

    //? else append the user to req
    req.body = {
        title: req.body.title,
        body: req.body.body,
        user: user.user._id
    }
    console.log(req.body);

    return next();
}