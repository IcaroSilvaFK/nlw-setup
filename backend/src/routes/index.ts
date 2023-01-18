import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';

import { prismaClient } from '../infra/configs/prisma';

export async function router(fastify: FastifyInstance) {
  fastify.post('/habits', async (request, reply) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);
    const today = dayjs().startOf('day').toDate();

    await prismaClient.habit.create({
      data: {
        title,
        createdAt: today,
        habitWeekDays: {
          createMany: {
            data: weekDays.map((weekDay) => ({ weekDay })),
          },
        },
      },
    });

    reply.status(201);
  });

  fastify.get('/dat', (request, reply) => {
    const getDayParams = z.object({
      data: z.coerce.date(),
    });

    const { data } = getDayParams.parse(request.query);
  });
}
