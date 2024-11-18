import { Router } from 'express';
import axios from 'axios';
import { wait, resConstructor } from './utils/common';
import { DB_URL } from './utils/constants';

const INIT_TIMEOUT = 1000;

const router = Router();

router.get('/api/v1/users', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { size, page } = req.query;
    const { data } = await axios.get(`${DB_URL}/users`);

    const itemsPerPage = Number(size);
    const currentPage = Number(page) + 1;

    const dataFromIndex = currentPage * itemsPerPage - itemsPerPage;
    const dataTillIndex = currentPage * itemsPerPage;
    const currentContent = data.slice(dataFromIndex + 1, dataTillIndex);

    const totalPages = Math.ceil(Number(data.length) / itemsPerPage);
    const last = totalPages === currentPage;

    if (data) {
      res.send(
        resConstructor.success({
          content: currentContent,
          pageable: {
            pageNumber: page,
            pageSize: itemsPerPage,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last,
          totalPages,
          totalElements: data.length,
          number: 0,
          first: false,
          sort: {
            empty: false,
            sorted: false,
            unsorted: true,
          },
          size: Number(size),
          numberOfElements: currentContent.length,
          empty: false,
        }),
      );
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

router.get('/api/v1/users/:id', wait(INIT_TIMEOUT), async (req, res) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`${DB_URL}/users/${id}`);

    if (data) {
      res.send(resConstructor.success(data));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

export default router;
