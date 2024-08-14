const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

app.post('/translate-pdf', upload.single('pdf'), async (req, res) => {
  try {
    const { targetLanguage } = req.body;

    if (!targetLanguage || !req.file) {
      return res.status(400).send('Target language and file are required');
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: `./${process.env.GOOGLE_KEY_FILE}`,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const translate = google.translate({
      version: 'v3',
      auth: auth,
    });

    const fileContent = req.file.buffer.toString('base64');

    const request = {
      parent: `projects/${process.env.PROJECT_ID}/locations/global`,
      requestBody: {
        targetLanguageCode: targetLanguage,
        documentInputConfig: {
          mimeType: 'application/pdf',
          content: fileContent,
        },
      },
    };

    const response = await translate.projects.locations.translateDocument(request);

    if (!response.data || !response.data.documentTranslation || !response.data.documentTranslation.byteStreamOutputs) {
      throw new Error('Unexpected response format');
    }

    const translatedPdfBuffer = Buffer.from(response.data.documentTranslation.byteStreamOutputs[0], 'base64');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="translated.pdf"');
    res.send(translatedPdfBuffer);

  } catch (error) {
    console.error('Error translating PDF:', error);
    res.status(500).send('Error translating PDF');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});