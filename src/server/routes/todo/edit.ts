import { defineEventHandler, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(body.id) },
      data: { title: body.title, completed: body.completed },
    });
    return updatedTodo;
  } catch (error) {
    return new Response('Failed to edit todo.', { status: 500 });
  }
});
