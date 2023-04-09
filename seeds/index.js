const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors}=require('./seedHelper');
const Campground = require('../models/campgrounds');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, already true on version 6+
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("database connected!");
});

// seeding random names
const sample = array => array[Math.floor(Math.random()*array.length)] 
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<200; i++){
        const random1000 = Math.floor(Math.random()*1000)
        const price = (Math.random()*(70-30) + 30).toFixed(2)
        const camp = new Campground({
            author:'642da96ee97f63c9f3cb4d82',
            title : `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit soluta quo qui, dolorem sint ratione dolor consequatur distinctio quibusdam aspernatur rerum repellendus? Voluptatibus enim dolores cumque ea tempora nesciunt laudantium.`,
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            // image: `https://source.unsplash.com/random/500x400`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dzg1kwec3/image/upload/v1680630420/YCAMP/v3kfa9seb3aqtg2hzxhf.jpg',
                  filename: 'YCAMP/v3kfa9seb3aqtg2hzxhf',        
                }
              ],
        })
        await camp.save();
    }
}
// promise to close
seedDB().then(() => {
    mongoose.connection.close();
})