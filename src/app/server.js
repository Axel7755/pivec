const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const apiKey = 'd968a88a4a3215da3da618e6836d8e9b6721255dc6f9e4bed38aa332ee118b9e'; // Asegúrate de usar una clave válida

// Endpoint para manejar solicitudes 
app.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(`https://serpapi.com/search.json`, {
      params: {
        engine: 'google_scholar',
        q: query,
        api_key: apiKey,
      },
    });

    // Extrae y formatea los resultados si es necesario
    const formattedResults = response.data.results.map(result => ({
      title: result.title,
      snippet: result.snippet,
      link: result.link,
    }));

    res.json({ results: formattedResults });
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    res.status(500).send('Se produjo un error al buscar.');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
