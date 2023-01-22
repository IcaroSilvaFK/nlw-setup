import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';

import { router } from './routes';
async function bootstrap() {
  try {
    const app = fastify({ logger: true });
    //Number(process.env.PORT) ||
    const PORT = 8080;

    app.register(cors);
    app.register(router);

    app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀server running at port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
