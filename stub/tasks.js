const { Router } = require('express');
const axios = require('axios');
const { wait, resConstructor } = require('./utils/common');
const { DB_URL } = require('./utils/constants');

const INIT_TIMEOUT = 1000;

const router = Router().get('/api/v1/tasks', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { page } = req.query;
    const { data } = await axios.get(`${DB_URL}/tasks`);
    const itemsPerPage = 5;

    if (data) {
      return res.send(
        resConstructor.success({
          content: data.slice((Number(page) * itemsPerPage) - itemsPerPage, Number(page) * itemsPerPage),
          pageable: {
            pageNumber: page,
            pageSize: itemsPerPage,
            sort: {
              empty: false,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            paged: true,
            unpaged: false
          },
          last: false,
          totalPages: Math.round(Number(data.length) / itemsPerPage),
          totalElements: data.length,
          number: 0,
          first: false,
          sort: {
            empty: false,
            sorted: false,
            unsorted: true,
          },
          size: 1,
          numberOfElements: 0,
          empty: false,
        }),
      );
    }
  } catch (error) {
    res.sendStatus(404);
  }
}).get('/api/v1/tasks/:id', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { page } = req.query;
    const { data } = await axios.get(`${DB_URL}/tasks`);
    const itemsPerPage = 5;

    if (data) {
      return res.send(
        resConstructor.success({
          content: data.slice((Number(page) * itemsPerPage) - itemsPerPage, Number(page) * itemsPerPage),
          pageable: {
            pageNumber: page,
            pageSize: itemsPerPage,
            sort: {
              empty: false,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            paged: true,
            unpaged: false
          },
          last: false,
          totalPages: Math.round(Number(data.length) / itemsPerPage),
          totalElements: data.length,
          number: 0,
          first: false,
          sort: {
            empty: false,
            sorted: false,
            unsorted: true,
          },
          size: 1,
          numberOfElements: 0,
          empty: false,
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
