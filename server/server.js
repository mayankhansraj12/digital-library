const express = require('express');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean'); // Deprecated and causing issues

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(mongoSanitize());
// app.use(xss());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/books', require('./src/routes/books'));

// Root Endpoint
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
