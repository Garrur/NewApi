
const express = require('express');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud/translate').v2;
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

// Initialize Google Cloud Translation API client


const port = 3000;


const translate = new Translate({
    projectId: process.env.GOOGLE_PROJECT_ID,
    key: process.env.GOOGLE_API_KEY
});
app.use(express.json())
// POST endpoint 
app.post('/api/translate', async (req, res) => {
    try {
        // Extract text  from request body
        const { text } = req.body;

      
        if (!text) {
            return res.status(400).json({ error: 'Text to translate is required.' });
        }

        // Translate from English to French
        const [translation] = await translate.translate(text, 'fr');

        // Respond with translated text
        res.json({ translation });
    } catch (error) {
        console.error('Error during translation:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

// default route 
app.use((req, res) => {
    res.status(404).json({ msg:"Go To Postman url/api/translate" });
});

// Start the server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





