const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,

    },
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String
    },
    photo:{
        type: String, default: "https://toppng.com/uploads/preview/hacker-avatar-11556286058ge7psro7wu.png"
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
}
    , {
        timestamps: true,
    });
/* nen bao password k chinh xac */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model('User', userSchema);