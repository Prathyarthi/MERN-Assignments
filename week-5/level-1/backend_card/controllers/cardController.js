import { Card } from "../models/cardModel.js";

export const cardDetails = async (req, res) => {
    const { name, description, interests } = req.body;

    if (!name || !description || !interests) {
        return res.status(400).json({
            success: false,
            message: 'Missing fields'
        });
    }

    const details = await Card.create({
        name,
        description,
        interests
    })

    if (!details) {
        res.status(400).json({
            success: false,
            message: 'Failed to add card details'
        })
    }

    details.save()

    res.status(200).json({
        success: true,
        message: "Details added!",
        cards: details
    })
}


export const getCards = async (req, res) => {
    const cardDetails = await Card.find({})

    if (!cardDetails) {
        return res.status(404).json({
            success: false,
            message: 'No Cards found.'
        })
    }

    res.status(200).json({
        success: true,
        message: "Cards fetched",
        cardDetails
    })
}