const fastify = require('fastify')({ logger: true });
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: {title:'Swagger Docs'}
    }
});
fastify.register(require('./routes/ItemRoutes'))

const PORT = 5000;


const start = async () => {
    try {
        await fastify.listen(PORT)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start();
