const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
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
      return res.status(400).json({ message: 'Target language and file are required' });
    }

    // Upload document to DeepL
    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);
    formData.append('target_lang', targetLanguage);

    const uploadResponse = await axios.post('https://api.deepl.com/v2/document', formData, {
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        ...formData.getHeaders(),
      },
    });

    if (!uploadResponse.data) {
      throw new Error('Failed to upload document to DeepL');
    }

    const { document_id, document_key } = uploadResponse.data;

    // Poll for translation status
    let statusResponse;
    do {
      statusResponse = await axios.post(`https://api.deepl.com/v2/document/${document_id}`, {
        document_key: document_key,
      }, {
        headers: {
          'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (statusResponse.data.status === 'error') {
        throw new Error('DeepL translation failed');
      }

      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
    } while (statusResponse.data.status !== 'done');

    // Download translated document
    const downloadResponse = await axios.post(`https://api.deepl.com/v2/document/${document_id}/result`, {
      document_key: document_key,
    }, {
      responseType: 'arraybuffer',
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
    });

    if (!downloadResponse.data) {
      throw new Error('Failed to download translated document');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="translated.pdf"');
    res.send(downloadResponse.data);

  } catch (error) {
    console.error('Error translating PDF:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});