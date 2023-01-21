import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import dayjs from 'dayjs';

import { prismaClient } from '../infra/configs/prisma';

export async function router(app: FastifyInstance) {
  app.post('/habits', async (request, reply) => {
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

  app.get('/day', async (request, reply) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);
    const parsedDate = dayjs(date).startOf('day');
    const weekDay = parsedDate.get('day');

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
    const completedHabits =
      day?.dayHabits.map((dayHabit) => dayHabit.habitId) ?? [];

    return reply.send({
      possibleHabits,
      completedHabits,
    });
  });

  app.patch('/habits/:id/toggle', async (request, reply) => {
    const paramsObject = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsObject.parse(request.params);

    const today = dayjs().startOf('day').toDate();

    let day = await prismaClient.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prismaClient.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prismaClient.dayHabit.findUnique({
      where: {
        habitId_dayId: {
          dayId: day.id,
          habitId: id,
        },
      },
    });

    if (dayHabit) {
      await prismaClient.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    }
    if (!dayHabit) {
      await prismaClient.dayHabit.create({
        data: {
          dayId: day.id,
          habitId: id,
        },
      });
    }

    reply.send('ok');
  });

  app.get('/summary', async (request, reply) => {
    const summary = await prismaClient.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM
            day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT  
            cast(count(*) as float)
          FROM 
            habit_week_days HWD
          JOIN 
            habits H
            ON 
              H.id = HWD.habit_id
          WHERE 
            HWD.week_day = extract(dow FROM D.date)
          AND
            H.created_at <= D.date
        ) as amount
      FROM 
        days D 
      
    `;

    reply.send(summary);
  });
}
