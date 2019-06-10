const chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised');


//should() is built in chai method
chai.use(chaiAsPromised).should();

const User = require('../models/m_users');
const Restaurants = require('../models/m_restaurants');
const Reviews = require('../models/m_reviews');

describe('Users model tests', () => {
    //Given an email address, do you get a user object in return
    it('should be a valid user object', async () => {
        const userInstance = new User(null, null, null, 'liz@gmail.com', null);
        const theUser = await userInstance.getUserByEmail();
        console.log("the user is", theUser);
        expect(theUser).to.be.an('object');
    });

    it('should NOT be undefined', async () => {
        const userInstance = new User(null, null, null, 'liz@gmail.com', null);
        const theUser = await userInstance.getUserByEmail();
        expect(theUser.id).to.not.be.an('undefined');
    });

    it('should get a list of all users', async () => {
        const allUsers = await User.getAllUsers();
        expect(allUsers).to.not.be.an('undefined');
    })
})

describe('Restaurants model tests', () => {
    it('should get a list of all restaurants', async () => {
        const allbiz = await Restaurants.getAll();
        expect(allbiz).to.not.be.an('undefined');
    });

    it('should insert new restaurants', async () => {
        const theRestaurant = await Restaurants.update('restaurant name', '404', 'Sims Lane', 'Franklin', 'TN', 'blah@blah.com');
        expect(theRestaurant).to.be.an('object');
    })
})

describe('Reviews model tests', () => {
    it('should get a list of all the reviews', async () => {
        const allreviews = await Reviews.getAll();
        expect(allreviews).to.not.be.an('undefined');
    });

    it('should insert a new review', async () => {
        const theReview = await Reviews.update(1, 'Blah', 4, 3);
        expect(theReview).to.be.an('object');
    })

})

