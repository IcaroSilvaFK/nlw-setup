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

  fastify.get('/day', async (request, reply) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);
    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

    console.log({
      date,
      weekDay,
    });

    const possibleHabits = await prismaClient.habit.findMany({
      where: {
        createdAt: {
          lte: date,
        },
        habitWeekDays: {
          some: {
            weekDay,
          },
        },
      },
    });

    const day = await prismaClient.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });
    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habitId);

    return reply.send({
      possibleHabits,
      completedHabits,
    });
  });
}
