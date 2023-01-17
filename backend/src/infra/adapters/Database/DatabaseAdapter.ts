import { PrismaClient } from '@prisma/client';

export class DatabaseAdapter {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({ log: ['query'] });
  }
}
