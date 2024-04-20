const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{timestamp: {type: Number}}],
    totalClicks: {
        type: Array,
        default: function() {
            return Array(365).fill(0); // creating an array of 365 zeroes
        },
    },
    },
    {timestamps: true}
);

const db = mongoose.model('url', schema);

module.exports = db;