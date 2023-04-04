const mongoose = require('mongoose');
const { campgroundSchema } = require('../schema');
const Review = require('./review');
const { object } = require('joi');
const { type } = require('os');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: {
        type: String
    },
    images: [{
        url: {type: String},
        filename: {type: String}
    }],
    price: {
        type: Number
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// Middleware  deleting reviews along with camp deletion
CampgroundSchema.post('findOneAndDelete', async function(doc){
    if (doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

// collection creation using model and schema
module.exports = mongoose.model('Campground', CampgroundSchema);
