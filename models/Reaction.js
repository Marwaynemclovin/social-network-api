const { Schema, Types } = require('mongoose');
const timeFormat = require('./time/timeFormat');

const Reaction = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: timeFormat
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

module.exports = Reaction;