const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

const apiKey = '47a287ecd296e876b21d93e6a43fc822c22bb48eeffc1228d241f5cbe5408d17'; // Asegúrate de usar una clave válida

// Endpoint para manejar solicitudes 
app.get('/search', async (req, res) => {
  const query = req.query.q;

  console.log(`Received search query: ${query}`);

  try {
    const response = await axios.get(`https://serpapi.com/search.json`, {
      params: {
        engine: 'google_scholar',
        q: query,
        api_key: apiKey,
      },
    });

    console.log('Response from SerpApi:', response.data);

    if (response.data.organic_results) {
      // Extrae y formatea los resultados si es necesario
      const formattedResults = response.data.organic_results.map(result => ({
        title: result.title,
        snippet: result.snippet,
        link: result.link,
      }));

      res.json({ results: formattedResults });
    } else {
      console.error('No organic results found in response:', response.data);
      throw new Error('No results found');
    }

  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    res.status(500).send(`Se produjo un error al buscar: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
