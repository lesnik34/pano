const express = require('express');
const cors = require('cors')
const { SELF_PORT, SUCCESS_CODE } = require('./utils/constants');
const { router: usersRouter } = require('./users')
const { router: tasksRouter } = require('./tasks')
const { router: authRouter } = require('./auth')

const app = express();

app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(SUCCESS_CODE);
  }

  return next();
});

app.use(usersRouter)
app.use(tasksRouter)
app.use(authRouter)

app.listen(SELF_PORT, () => {
  console.log(`Mock api server starts at ${SELF_PORT}`);
});
