const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Para permitir CORS

const app = express();
const port = 3000;

app.use(cors()); // Permite solicitudes desde cualquier origen
app.use(express.json());

// Endpoint para redirigir solicitudes a la API de Serpapi
app.get('/search', async (req, res) => {
  const query = req.query.q;
  const apiKey = '285f0000d24c1d580fa2ac8c40d920ecb2e3e4eaa2846de0594a04885a0de593'; // Reemplaza con tu API Key

  try {
    const response = await axios.get(`https://serpapi.com/search.json?engine=google_scholar&q=${encodeURIComponent(query)}&api_key=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Se produjo un error al buscar.');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});