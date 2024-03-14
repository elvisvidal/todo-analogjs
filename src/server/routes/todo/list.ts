import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: [
        {
          completed: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
    return todos;
  } catch (error) {
    return new Response('Failed to list todo.', { status: 500 });
  }
});
