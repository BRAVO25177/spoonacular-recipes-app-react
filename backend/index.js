const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://api.generativeai.com/v1/chat',
            {
                model: 'gemini-2.0-flash-exp',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with Gemini API');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});