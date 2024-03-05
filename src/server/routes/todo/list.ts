import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  return [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
    { id: 3, title: 'Explore more features', completed: false },
    { id: 4, title: 'Fech from database', completed: false },
  ];
});
