import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';

import { router } from './routes';
async function bootstrap() {
  try {
    const schema = {
      type: 'object',
      required: ['PORT'],
      properties: {
        PORT: {
          type: 'string',
          default: 3000,
        },
      },
    };
    const options = {
      dotenv: true, // will read .env in root folder
      schema,
    };

    const app = fastify({ logger: true });
    const PORT = Number(process.env.PORT) || 8080;

    app.register(fastifyEnv, options);
    app.register(cors);
    app.register(router);

    app.listen({ port: PORT });
    console.log(`🚀server running at port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
