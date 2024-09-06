const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/availability', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// Mongoose Schema
const availabilitySchema = new mongoose.Schema({
    user: String,
    date: Date,
    start: String,
    end: String
});

const Availability = mongoose.model('Availability', availabilitySchema);

// Routes
app.post('/api/availability', async (req, res) => {
    const { user, date, start, end } = req.body;

    const newAvailability = new Availability({ user, date, start, end });
    await newAvailability.save();
    res.send({ message: 'Availability added successfully' });
});

app.get('/api/availability', async (req, res) => {
    const availabilities = await Availability.find();
    res.send(availabilities);
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
