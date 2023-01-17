import { FastifyInstance } from 'fastify';

export async function router(fastify: FastifyInstance) {
  fastify.get('/', (req, reply) => {
    reply.send('<h1>Hello world</h1>');
  });
}
