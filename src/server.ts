import express from 'express';

const app = express();

app.use('/', (request, response) =>
  response.json({ message: 'Hello goStack 12!' }),
);

app.listen(3333, () => {
  console.log('🚀 Back-end is running on http://localhost:3333/');
});
