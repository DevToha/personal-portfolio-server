require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Email sending endpoint
app.post('/send-email', (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Message from ${firstname} ${lastname}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: 'Email sent: ' + info.response });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
