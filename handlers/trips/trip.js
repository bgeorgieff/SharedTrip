const { ObjectID } = require('bson')
const mongoose = require('mongoose')
const { Schema, model: Model } = mongoose
const { String, Number, Object } = Schema.Types


const trippSchema = new Schema({
    startPoint: {
        type: String
    },
    endPoint: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    seats: {
        type: Number
    },
    description: {
        type: String
    },
    carImage: {
        type: String
    },
    driver: {
        type: ObjectID,
        ref: 'User'
    },
    otherPpl: [{
        type: ObjectID,
        ref: 'User'
    }]
})

module.exports = new Model('Trip', trippSchema)