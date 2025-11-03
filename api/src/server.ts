import { fastify } from 'fastify';
import {fastifyCors} from '@fastify/cors';
import {fastifySwagger} from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { serializerCompiler, 
    validatorCompiler, 
    jsonSchemaTransform,
    type ZodTypeProvider } from 'fastify-type-provider-zod';
import { listWebhooks } from './routes/list-webhooks';
import { env } from './env';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
//   credentials: true,
//  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Webhook Inspector API',
      description: 'API for the Webhook Inspector',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
  routePrefix: '/docs',
  exposeRoute: true,
  swagger: {
    info: { title: 'API Webhook Inspector with IA' },
  },
});

app.register(listWebhooks);


app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
  console.log(`Docs available at ${address}/docs`);
});
