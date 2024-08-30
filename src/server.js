// server.js

import express from 'express';
import Airtable from 'airtable';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS to allow requests from the React frontend
app.use(cors());

// Airtable configuration
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appOGVFN0HbzbUzbV');

// API endpoint to get catalog items
app.get('/api/catalogue', (req, res) => {
  let allRecords = [];

  base('New Upperwear')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        allRecords = [...allRecords, ...records];
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching data from Airtable');
        } else {
          res.json(allRecords);
        }
      }
    );
});

// API endpoint to get celebrity data
app.get('/api/celebrities', (req, res) => {
  let allRecords = [];

  base('Celebrity')
    .select({
      view: 'Grid view',
    })
    .eachPage(
      function page(records, fetchNextPage) {
        allRecords = [...allRecords, ...records];
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          res.status(500).send('Error fetching data from Airtable');
        } else {
          res.json(allRecords);
        }
      }
    );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});