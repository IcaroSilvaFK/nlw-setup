import fastify from 'fastify';
import { router } from './routes';

async function bootstrap() {
  try {
    const app = fastify({ logger: true });
    const PORT = Number(process.env.PORT) || 8080;

    app.register(router);

    app.listen({ port: PORT });
    console.log(`🚀server running at port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
