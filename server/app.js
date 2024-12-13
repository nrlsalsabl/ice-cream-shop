// // server/app.js

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware untuk parsing JSON
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const iceCreamRoutes = require('./routes/iceCreamRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/ice-creams', iceCreamRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});