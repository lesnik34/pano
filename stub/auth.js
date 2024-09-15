const { Router } = require('express');
const axios = require('axios');
const { wait, resConstructor } = require('./utils/common');
const { DB_URL } = require('./utils/constants');

const INIT_TIMEOUT = 1000;

const router = Router().post('/api/v1/auth/login', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { data } = await axios.get(`${DB_URL}/users/5000496962`);

    if (data) {
      return res.send(
        resConstructor.success({
          token: '123-123-123',
          userId: data.id,
        }),
      );
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = {
  router,
};
