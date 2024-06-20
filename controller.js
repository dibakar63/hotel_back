const express = require('express');
const authHelper = require('./helper');
const getUserModel = require('./authModel');
const getDbConnection = require('./db');
const getCustomerModel=require('./customer-registerModel')
const JWT = require('jsonwebtoken');
const router = express.Router();
const getHotelModel = require('./model');
const getFoodModel=require('./food-itemRegister')
const getRoomModel =require('./room-registerModel')
const getFoodBillModel =require('./foodBilling');
const getRoomBillModel=require('./roomBilling')

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

router.post('/roomRegister', async (req, res) => {
    const { customerId, data } = req.body;

    try {
        const connection = await getDbConnection(customerId);
        const Room = getRoomModel(connection);

        const newRoomData = new Room(data);
        await newRoomData.save();

        res.status(201).json({message:"Room registered successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
router.delete('/roomRegister/:roomId', async (req, res) => {
    const { customerId } = req.body;
    const { roomId } = req.params;

    try {
        const connection = await getDbConnection(customerId);
        const Room = getRoomModel(connection);

        // Check if room exists
        const existingRoom = await Room.findById(roomId);
        if (!existingRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Delete the room
        await Room.findByIdAndDelete(roomId);

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/foodRegister', async (req, res) => {
    const { customerId, data } = req.body;

    try {
        const connection = await getDbConnection(customerId);
        const Food = getFoodModel(connection);

        const newFoodData = new Food(data);
        await newFoodData.save();

        res.status(201).json({message:"Food Registered SuccessFully",newFoodData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
router.post('/foodBillRegister', async (req, res) => {
    const { customerId, data } = req.body;

    try {
        const connection = await getDbConnection(customerId);
        const FoodBill = getFoodBillModel(connection);

        const newFoodBillData = new FoodBill(data);
        await newFoodBillData.save();

        res.status(201).json({message:"Food Bill Registered SuccessFully",newFoodBillData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
router.post('/customer', async (req, res) => {
    const { customerId, data } = req.body;

    try {
        const connection = await getDbConnection(customerId);
        const Customer = getCustomerModel(connection);

        const newCustomerData = new Customer(data);
        await newCustomerData.save();

        res.status(201).json({message:"Customer Added Successfully",newCustomerData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
router.get('/getCustomerdata/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const connection = await getDbConnection(customerId);
        const Customer = getCustomerModel(connection);
        const customer = await Customer.find();
        res.status(200).json(customer);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})
router.get('/getRoomdata/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const connection = await getDbConnection(customerId);
        const Room = getRoomModel(connection);
        const room = await Room.find();
        res.status(200).json(room);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})
router.put('/updateAvailability/:customerId/:roomId',async(req,res)=>{
    const {customerId}=req.params;
    const {roomId}=req.params;
    try{
        const connection=await getDbConnection(customerId);
        const Room=getRoomModel(connection);
        const room=await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
          }
          room.availability=!room.availability;
          await room.save();
          res.status(200).json({ message: 'Room availability updated successfully', room });
        
    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})
router.post('/roomBill',async(req,res)=>{
    const { customerId, data } = req.body;

    try {
        const connection = await getDbConnection(customerId);
        const RoomBill = getRoomBillModel(connection);

        const NewRoomBill = new RoomBill(data);
        await NewRoomBill.save();

        res.status(201).json({message:"Room Bill Added SuccessFully",NewRoomBill});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

router.get('/getRoomBillData/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const connection = await getDbConnection(customerId);
        const RoomBill = getRoomBillModel(connection);
        const roomBill = await RoomBill.find();
        res.status(200).json(roomBill);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

router.get('/getFooddata/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const connection = await getDbConnection(customerId);
        const Food = getFoodModel(connection);
        const food = await Food.find();
        res.status(200).json(food);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})
router.get('/getFoodbilldata/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const connection = await getDbConnection(customerId);
        const Food = getFoodBillModel(connection);
        const food = await Food.find();
        res.status(200).json(food);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
