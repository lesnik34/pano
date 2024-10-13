import { Router } from 'express';
import axios from 'axios';
import { wait, resConstructor } from './utils/common';
import { DB_URL } from './utils/constants';

const INIT_TIMEOUT = 1000;

const router = Router();

router.post('/api/v1/auth/login', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { data } = await axios.get(`${DB_URL}/users/5000496962`);

    if (data) {
      res.send(resConstructor.success('123-123-123'));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

export default router;
