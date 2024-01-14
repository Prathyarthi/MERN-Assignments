import mongoose, { Schema } from 'mongoose'

const cardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    interests: [{
        type: String,
        required: true,
    }]
})

export const Card = mongoose.model('Card', cardSchema);
