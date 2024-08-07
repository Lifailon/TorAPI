const swaggerJsdoc = require('swagger-jsdoc')
const yaml = require('js-yaml')
const fs = require('fs')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TorAPI',
            version: '0.4.0',
            description: 'Unofficial API (backend) for RuTracker, Kinozal, RuTor and NoNameClub',
            contact: {
                name: "© Lifailon (Alex Kup)",
                url: "https://github.com/Lifailon/TorAPI"
            },
            license: {
                name: "License MIT",
                url: "https://github.com/Lifailon/TorAPI/blob/main/LICENSE"
            }
        },
        servers: [
            {
              url: 'http://localhost:8443',
              description: 'Local server'
            },
            {
              url: 'https://toruapi.vercel.app',
              description: 'Production server'
            }
        ]
    },
    apis: ['./swagger/swagger.js']
}

const specs = swaggerJsdoc(options)

const swaggerYaml = yaml.dump(specs)

fs.writeFileSync('./swagger/swagger.json', JSON.stringify(specs, null, 2), 'utf8')
fs.writeFileSync('./swagger/swagger.yaml', swaggerYaml, 'utf8')