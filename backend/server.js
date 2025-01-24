
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:5713', 'https://rapidassignment.netlify.app/'], // Allow local and deployed frontend
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true, // If using cookies or authentication
}));

// MongoDB connection
mongoose
    .connect("mongodb+srv://7juned7:000000000@cluster0.nyxn5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


// Mongoose schema and model for email templates

const layoutSchema = new mongoose.Schema({
    html: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
// Create a model
const Layout = mongoose.model("Layout", layoutSchema);

app.post("/save-layout", async (req, res) => {
    const { html } = req.body;

    if (!html) {
        return res.status(400).json({ error: "HTML content is required" });
    }

    try {
        // Save layout to MongoDB
        const newLayout = new Layout({ html });
        await newLayout.save();

        res.status(201).json({ message: "Layout saved successfully", layoutId: newLayout._id });
    } catch (err) {
        console.error("Error saving layout:", err);
        res.status(500).json({ error: "Failed to save layout" });
    }
});



app.post('/uploadEmailConfig', async (req, res) => {
    const { titleDOM, contentDOM } = req.body;

    if (!titleDOM || !contentDOM) {
        return res.status(400).send({ error: 'Title and content are required' });
    }

    try {
        const emailTemplate = new EmailTemplate({
            title: titleDOM,
            content: contentDOM,
        });
        await emailTemplate.save();
        res.send({ message: 'Email template saved successfully', emailTemplate });
    } catch (error) {
        console.error('Error saving email template:', error);
        res.status(500).send({ error: 'Error saving email template' });
    }
});
app.get('/getLayout', async (req, res) => {
    try {
        const layout = await Layout.findOne().sort({ createdAt: -1 });
        res.status(200).json(layout);
        console.log(layout)
    } catch (error) {
        console.error('Error fetching email templates:', error);
        res.status(500).send({ error: 'Error fetching email templates' });
    }
});
app.get('/check-db', (req, res) => {
    mongoose.connection.on('connected', () => {
        res.status(200).json({ message: 'MongoDB is connected' });
    });

    mongoose.connection.on('error', (err) => {
        res.status(500).json({ message: 'MongoDB connection failed', error: err });
    });
});


app.get("/", (req, res) => {
    res.send("hello")
})
// Start the server
app.listen(5000, console.log(`Server Started on PORT ${PORT}`));