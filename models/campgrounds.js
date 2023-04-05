const mongoose = require('mongoose');
const { campgroundSchema } = require('../schema');
const Review = require('./review');
const { object, string } = require('joi');
const { type } = require('os');
const { runInThisContext } = require('vm');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {type: String},
    filename: {type: String}
});

ImageSchema.virtual('thumbnail').get( function(){
    return this.url.replace('/upload','/upload/w_300,c_scale');
});

const CampgroundSchema = new Schema({
    title: {
        type: String
    },
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: [Number],
            require: true
        }
    },
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
