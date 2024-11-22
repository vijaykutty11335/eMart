require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const CreateAdminAccount = require('./scripts/admin');
const app = express();


connectDB();
CreateAdminAccount();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/Products'));
app.use('/uploads', express.static('uploads'));
app.use('/api/users', require('./routes/user'));
app.use('/api/cart', require('./routes/cart'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
