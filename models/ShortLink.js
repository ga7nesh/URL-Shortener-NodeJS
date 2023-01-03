const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const shortLinkSchema = Schema({
    real_link: {
        type: String,
        required: true,
    },
    short_link: {
        type: String,
        required: true,
        unique: true
    },
    ip: {
        type: String,
        required: true
    }
}, { timestamps: true} );

module.exports = ShortLink = mongoose.model('short_links', shortLinkSchema);

