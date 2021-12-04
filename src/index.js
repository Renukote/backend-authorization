const express = require('express');
const mongoose = require('mongoose');
const connect = () => { return mongoose.connect("mongodb://127.0.0.1:27017/auth")};

const {register, login} = require("./controllers/auth.controller");
const productController = require("./controllers/post.controller");

const app = express();
app.use(express.json());

app.use("/register", register);
app.use("/login", login);
app.use("/products", productController);

app.listen(2000, async () => {
    await connect();
    console.log("Listening to port 2000")
});