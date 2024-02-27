const express = require('express');
const bodyParser = require('body-parser');
const { Translate } = require('@google-cloud/translate').v2;
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

// Initialize Translation API client
const translate = new Translate({
    projectId: process.env.GOOGLE_PROJECT_ID,
    key: process.env.GOOGLE_API_KEY
});

const port = 3000;

app.use(express.json());



// Function to check overflow and underflow
function checkTextLength(text) {
    const maxLength = 5000; 
    const minLength = 1;    

    if (text.length > maxLength) {
        throw new Error('Text exceeds maximum length limit.');
    } else if (text.length < minLength) {
        throw new Error('Text does not meet minimum length requirement.');
    }
}

// POST endpoint 
app.post('/api/translate', async (req, res) => {
    try {
        // Extract text from request body
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text to translate is required.' });
        }
        checkTextLength(text);

        

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
    res.status(404).json({ 
        error: 'Route not found.',
        msg:"Go To Postman and Enter site-url/api/translate"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
