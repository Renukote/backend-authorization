const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    name: { type: String, required: false },
},
    {
        versionKey: false,
        timestamps: true
    });


// hashing the password 10 times to protect it.

userSchema.pre("save", function (next) {

    if (!this.isModified("password")) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        return next();
    });
})


userSchema.methods.checkPassword = function (password) {
    return new Promise((resolve,reject) => {
        bcrypt.compare(password, this.password, function(err, res) {
            console.log(password);
            if(err) return reject(err);

            return resolve(res);
        });
    })
}

module.exports = model("users", userSchema);
