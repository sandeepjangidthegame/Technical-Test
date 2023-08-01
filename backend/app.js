const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const app  = express();
require('./database/connection');
dotenv.config({path: "./.env"});

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : "NodeJS API Project for Test",
            version : "1.0.0"
        },
        components : {
            securitySchemas : {
                type : "http",
                schema : "bearer",
                bearerFormat : "JWT"
            }
        },
        security : {
            bearerAuth : []
        },
        servers : [
            {
               url : 'http://localhost:3000/'
            }
        ]
    },
    apis : ['./route/auth.js']
}

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(require('./route/auth'));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Docs are at http://localhost:${PORT}/api-docs`);
})