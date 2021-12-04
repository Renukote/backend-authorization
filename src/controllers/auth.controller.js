require("dotenv").config();
const express = require("express");
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")


const newToken = (user) => {
    return token = jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
}

const register = async (req, res) => {
    try {
        // check if the email already exists
        let user = await userModel.findOne({ email: req.body.email }).lean().exec();

        // if yes, throw an error
        if (user) { return res.status(400).json({ status: "failed", message: "email already exists" }) }

        // else create a new user
        user = await userModel.create(req.body);

        // create a new token
        const token = newToken(user);

        // return the user and the token
        return res.status(201).send({ user, token });

    } catch (e) {
        res.status(500).send({ message: e.message, status: "failed" });
    }
}

const login = async (req, res) => {
    try {
        // check if the user exists or not
        let user = await userModel.findOne({ email: req.body.email });

        // if not throw an error
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide the correct email address and password"
            })
        }

        // if user matches, check the password
        const match = await user.checkPassword(req.body.password);

        // if password not matched, throw an error
        if (!match) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide the correct email address and password"
            })
        }

        // else create a new token
        const token = newToken(user);

        // return the user and the token
        return res.status(201).send({ user, token});
    } catch (e) {
        res.status(500).send({ message: e.message, status: "failed" });
    }
}


module.exports = { register, login }
