require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});