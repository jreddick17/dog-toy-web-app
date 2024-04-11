const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toySchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    condition: {
        type: String,
        required: [true, 'Condition is required'],
        enum: ['New', 'Used', 'Slightly Used', 'Still in the Box', 'Very Used']
    },
    price: { type: Number, min: 0.01, required: [true, 'Price is required'] },
    offers: { type: Number, default: 0 }, // Set default value to 0
    seller: {type: Schema.Types.ObjectId, ref:'User'},
    description: {type: String, required: [true, 'description is required'], 
        minLength: [10, 'the content should have at least 10 characters']},
    image: {type: String, required: [true, 'image is required']},
    active: { type: Boolean, default: true }
},
{timestamps: true}
);

//collection is named toys
module.exports = mongoose.model('Toys', toySchema);



/* const {v4: uuidv4} = require('uuid');
const multer = require('multer');
const path = require("path");

const toys = [
{
    id: '1',
    title: 'Blue Frisbee',
    condition: 'Used',
    price: '6.99',
    offers: '0',
    seller: 'John Doe',
    description: 'My dog was gentle with it, but now she does not play with it at all',
    image: '/images/rope-frisbee.jpg'
},
{
    id: '2',
    title: 'Dino Toy 3 Pack',
    condition: 'New',
    price: '10.99',
    offers: '2',
    seller: 'Josh Reddick',
    description: 'Nunc eros nunc, dignissim vel metus vitae, vestibulum ornare enim.',
    image: '/images/dino-toy.jpg'
},
{
    id: '3',
    title: 'Rigid Bone',
    condition: 'Used',
    price: '4.99',
    offers: '1',
    seller: 'Jane Doe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/images/hard-bone-toy.jpg'
},
{
    id: '4',
    title: 'Spiky Ball',
    condition: 'Used',
    price: '3.99',
    offers: '3',
    seller: 'George Washington',
    description: 'Nulla sapien magna, mattis et eros eget, aliquet tristique nunc.',
    image: '/images/spiky-ball.jpg'
},
{
    id: '5',
    title: 'Squeaky Duck',
    condition: 'New',
    price: '11.99',
    offers: '1',
    seller: 'John Adams',
    description: 'Morbi hendrerit magna eu dolor elementum mattis.',
    image: '/images/duck.jpg'
},
{
    id: '6',
    title: 'Squeaky Ball',
    condition: 'New',
    price: '2.99',
    offers: '1',
    seller: 'Thomas Jefferson',
    description: 'Quisque dictum eget dolor nec volutpat.',
    image: '/images/squeaky-ball.jpg'
}
];

exports.find = () => toys;

exports.findById = id => toys.find(toy=>toy.id === id);
    
exports.save = function (toy) {
    toy.id = uuidv4();
    toy.offers = 0;
    toys.push(toy);
};

exports.updateById = function(id, newToy, imageFile) {
    let toy = toys.find(toy=>toy.id === id);
    if(toy) {
        toy.seller = newToy.seller;
        toy.condition = newToy.condition;
        toy.title = newToy.title;
        toy.price = newToy.price;
        toy.description = newToy.description;
        if (imageFile) {
            const imagePath = '/images/' + imageFile.name; 
            imageFile.mv('public' + imagePath, err => {
                if (err) {
                    console.error('Error uploading image:', err);
                } else {
                    toy.image = imagePath;
                    console.log('Image uploaded successfully');
                }
            });
        }
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = toys.findIndex(toy =>toy.id === id);
    if(index !== -1) {
        toys.splice(index, 1);
        return true;
    } else {
        return false;
    }
}

exports.searchByTerm = function(term) {
    return toys.filter(toy =>
        toy.title.toLowerCase().includes(term.toLowerCase()) ||
        toy.seller.toLowerCase().includes(term.toLowerCase()) ||
        toy.description.toLowerCase().includes(term.toLowerCase())
    );
}; */