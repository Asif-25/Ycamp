const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {type: String},
    filename: {type: String}
});

ImageSchema.virtual('thumbnail').get( function(){
    return this.url.replace('/upload','/upload/w_300,c_scale');
});

const opts = { toJSON: { virtuals: true } };

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
}, opts);

//cluster-map popup
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <h5><a href="/campgrounds/${this._id}">${this.title}</a></h5>
    <h6>${this.location}</h6>`
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
