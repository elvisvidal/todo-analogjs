import { defineEventHandler, getRouterParam } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id') ?? '';
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!todo) {
      return new Response('Todo not found.', { status: 404 });
    }

    return todo;
  } catch (error) {
    return error;
  }
});
