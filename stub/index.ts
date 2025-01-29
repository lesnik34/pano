import express from 'express';
import cors from 'cors';
import { SELF_PORT, SUCCESS_CODE } from './utils/constants';
import usersRouter from './users';
import tasksRouter from './tasks';
import authRouter from './auth';
import departmentsRouter from './departments';
import assignmentsRouter from './assignments';

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

  if (req.method === 'OPTIONS') {
    res.sendStatus(SUCCESS_CODE);
  }

  return next();
});

app.use(usersRouter);
app.use(tasksRouter);
app.use(authRouter);
app.use(departmentsRouter);
app.use(assignmentsRouter);

app.listen(SELF_PORT, () => {
  console.log(`Mock api server starts at ${SELF_PORT}`);
});
