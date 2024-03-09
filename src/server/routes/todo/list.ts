import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (error) {
    return error;
  }
});
