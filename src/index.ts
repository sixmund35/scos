import express from 'express';
import 'zod-openapi/extend';
import { loader } from './core/loader';

const app = express();
const port = 3000;

await loader(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
