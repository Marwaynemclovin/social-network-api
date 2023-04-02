// Define Mongoose
const mongoose = require('mongoose');
const { Thought } = require('.');

// Creates a new instance of Mongoose Schema to define and shape each document 
const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

const thoughtSchema = new mongoose.Schema({
    thoughtText: { 
        type: String, 
        required: true,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        get: createdAtVal => moment(createdAtVal).format("DD, MM, YYYY [at] hh:mm a")
    },
    username: {
            type: String,
            required: true,
        },
    reactions: [reactionSchema],
    },
     { 
    toJSON: { 
        virtuals: true 
    }, 
    id: false 
});

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

const User = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;