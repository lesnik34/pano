const { Router } = require('express');
const axios = require('axios');
const { wait, resConstructor } = require('./utils/common');
const { DB_URL } = require('./utils/constants');

const INIT_TIMEOUT = 1000;

const router = Router().get('/api/v1/users/:id', wait(INIT_TIMEOUT), async (req, res) => {
  const id = req.params.id;

  try {
    const { data } = await axios.get(`${DB_URL}/users/${id}`);

    if (data) {
      return res.send(resConstructor.success(data));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = {
  router,
};
