const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Meetups_master',
            version: '1.0.0',
            description: 'web api based on Node.js for working with meetups',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

function serveSwaggerUI(req, res, next) {
    swaggerUi.setup(swaggerSpec)(req, res, next)
}

module.exports = serveSwaggerUI