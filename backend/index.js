const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const router = require('./routes/Routes');

require("./config/db");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
const corsOptions = {
  // origin: 'https://intellectuals-tjmo.vercel.app',
  origin: 'http://localhost:3000',
   methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization', 
};

app.use(cors(corsOptions));

// Use the router for handling routes
app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
