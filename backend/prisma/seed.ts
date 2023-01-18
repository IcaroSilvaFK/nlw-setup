import { PrismaClient, HabitWeekDays } from '@prisma/client';
import { v4 as Uuid } from 'uuid';

const prisma = new PrismaClient();

const firstHabitId = Uuid();
const firstHabitDate = new Date('2022-12-31T03:00:00.000');

const secondHabitId = Uuid();
const secondHabitDate = new Date('2023-01-03T03:00:00.000');

const thirdHabitId = Uuid();
const thirdHabitDate = new Date('2023-01-03T03:00:00.000');

async function main() {
  await prisma.habitWeekDays.deleteMany();
  await prisma.dayHabit.deleteMany();
  await prisma.day.deleteMany();
  await prisma.habit.deleteMany();

  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Estudar PHP',
        createdAt: firstHabitDate,
        habitWeekDays: {
          create: [
            {
              weekDay: 1,
            },
            {
              weekDay: 2,
            },
            {
              weekDay: 3,
            },
          ],
        },
      },
    }),
    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'Ler o livro do scrum',
        createdAt: secondHabitDate,
        habitWeekDays: {
          create: [
            {
              weekDay: 3,
            },
            {
              weekDay: 4,
            },
            {
              weekDay: 5,
            },
          ],
        },
      },
    }),
    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Estudar arquitetura',
        createdAt: thirdHabitDate,
        habitWeekDays: {
          create: [
            {
              weekDay: 1,
            },
            {
              weekDay: 2,
            },
            {
              weekDay: 3,
            },
            {
              weekDay: 4,
            },
            {
              weekDay: 5,
            },
          ],
        },
      },
    }),
  ]);

  await Promise.all([
    prisma.day.create({
      data: {
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habitId: firstHabitId,
          },
        },
      },
    }),
    prisma.day.create({
      data: {
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            habitId: firstHabitId,
          },
        },
      },
    }),
    prisma.day.create({
      data: {
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [
            {
              habitId: firstHabitId,
            },
            {
              habitId: secondHabitId,
            },
          ],
        },
      },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
