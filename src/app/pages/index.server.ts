import { PageServerLoad } from '@analogjs/router';

export const load = async ({
  params, // params/queryParams from the request
  req, // H3 Request
  res, // H3 Response handler
  fetch, // internal fetch for direct API calls,
  event, // full request event
}: PageServerLoad) => {
  try {
    const data = await fetch('http://localhost:5173/api/todo/list');
    return {
      data,
      loaded: true,
    };
  } catch (error) {
    return {
      data: new Error('Failed to load todo.'),
      loaded: false,
    };
  }
};
