// Define Mongoose
const mongoose = require('mongoose');

// Creates a new instance of Mongoose Schema to define and shape each document 
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { 
    toJSON: { 
        virtuals: true 
    }, 
    id: false 
});

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

const User = mongoose.model("User", userSchema);

module.exports = User;