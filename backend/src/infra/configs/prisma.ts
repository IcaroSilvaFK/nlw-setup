import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
  log: ['query'],
});

async function main() {
  try {
    await prismaClient.$connect();
  } catch (err) {
    console.log(err);
  }
}
main();

export { prismaClient };
