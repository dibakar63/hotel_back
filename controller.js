const express = require('express');
const authHelper = require('./helper');
const getUserModel = require('./authModel');
const getDbConnection = require('./db');
const JWT = require('jsonwebtoken');
const router = express.Router();
const getHotelModel = require('./model');

router.post('/register', async (req, res) => {
    try {
        const { customerId, hotelName, password } = req.body;
        if (!customerId || !hotelName || !password) {
            return res.status(400).json({ message: 'customerId, hotelName, and password are required' });
        }

        const connection = await getDbConnection(customerId);
        const User = getUserModel(connection);

        const existingUser = await User.findOne({ customerId });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered, please login"
            });
        }

        const hashedPassword = await authHelper.hashPassword(password);
        const user = await new User({ customerId, hotelName, password: hashedPassword }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error: error.message // Ensure to send only error message
        });
    }
});

router.post('/login', async (req, res) => {
    const { customerId, password } = req.body;
    
    try {
        if (!customerId || !password) {
            return res.status(400).json({ message: "Invalid customerId or password" });
        }

        const connection = await getDbConnection(customerId);
        const User = getUserModel(connection);
        const user = await User.findOne({ customerId });

        if (!user) {
            return res.status(404).json({ message: "Invalid customerId" });
        }

        const match = await authHelper.comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Password incorrect" });
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            success: true,
            message: "Login successfully",
            user: {
                customerId: user.customerId,
                hotelName: user.hotelName,
                token
            }
        });

        // Example to find a hotel by name
        const Hotel = getHotelModel(connection);
        const hotel = await Hotel.findOne({ hotelName: req.body.hotelName });
        if (!hotel) {
            console.log('Hotel not found'); // Log the error or handle as needed
        } else {
            console.log('Found hotel:', hotel); // Log or handle hotel data as needed
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/data', async (req, res) => {
    const { customerId, data } = req.body;

    try {
        const connection = await getDbConnection(customerId);
        const Hotel = getHotelModel(connection);

        const newHotelData = new Hotel(data);
        await newHotelData.save();

        res.status(201).json(newHotelData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
router.get('/getAlldata', async (req, res) => {
    const { customerId } = req.body;
    try {
        const connection = await getDbConnection(customerId);
        const Hotel = getHotelModel(connection);
        const hotel = await Hotel.find();
        res.status(200).json(hotel);
    }catch{
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
