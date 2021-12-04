const express = require("express");
const postModel = require("../models/post.model");
const authenticate = require('../middlewares/authenticate');
const router = express.Router();



router.get("/", authenticate, async (req, res) => {
    try {
        let product = await postModel.find({}).lean().exec();
        console.log(product);
    
        return res.status(201).json({ product });
    } catch(e) {
        return res.status(500).send({ message: e.message, status: "failed" });
    }
})


router.post("/", authenticate, async (req, res) => {
    try {
        let product = await postModel.create(req.body);
        console.log(product);
    
        return res.status(201).json({ product });
    } catch(e) {
        return res.status(500).send({ message: e.message, status: "failed" });
    }
})


module.exports = router;