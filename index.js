const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require("./routes/authRoutes");
const moderateRoutes = require("./routes/moderateRoutes");

const PORT = process.env.PORT || 4002;
const app = express();

app.use(cors());

app.use(
    express.json({
        extended: false,
    })
);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jokes Moderate Microservice API',
            version: '1.0.0',
            description: 'API documentation for the Jokes Moderate Microservice',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/auth', authRoutes);
app.use('/', moderateRoutes);

app.listen(PORT, () => {
    console.log(`Moderate jokes microservice running on port ${PORT}`);
});