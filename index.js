const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const engine = req.query.engine || 'duckduckgo';

  if (!query) {
    return res.status(400).send('Missing query');
  }

  try {
    if (engine === 'google') {
      // WARNING: Google blocks scraping; results may be unreliable
      const response = await axios.get('https://www.google.com/search', {
        params: { q: query },
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });
      res.send(response.data);
    } else {
      const response = await axios.get('https://duckduckgo.com/html/', {
        params: { q: query },
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });
      res.send(response.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching results');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
