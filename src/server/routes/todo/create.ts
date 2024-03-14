import { defineEventHandler, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const newTodo = await prisma.todo.create({
      data: {
        title: body.title,
      },
    });
    return newTodo;
  } catch (error) {
    return new Response('Failed to create todo.', { status: 500 });
  }
});
