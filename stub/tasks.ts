import { Router } from 'express';
import axios from 'axios';
import { wait, resConstructor, filterTasks } from './utils/common';
import { DB_URL } from './utils/constants';

const INIT_TIMEOUT = 1000;

const router = Router();

router.get('/api/v1/tasks', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { page, size = '5', ...params } = req.query;
    const { data } = await axios.get(`${DB_URL}/tasks`);

    const itemsPerPage = Number(size);
    const currentPage = Number(page) + 1;

    const dataFromIndex = currentPage * itemsPerPage - itemsPerPage;
    const dataTillIndex = currentPage * itemsPerPage;

    const filteredData = filterTasks(data, params);
    const currentContent = filteredData.slice(dataFromIndex, dataTillIndex);

    const totalPages = Math.ceil(Number(currentContent.length) / itemsPerPage);
    const last = totalPages === currentPage;

    if (filteredData) {
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
          totalElements: filteredData.length,
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
    console.log(error);
    res.sendStatus(404);
  }
});

router.get('/api/v1/tasks/:id', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${DB_URL}/tasks/${id}`);

    if (data) {
      res.send(resConstructor.success(data));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post('/api/v1/tasks', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { id, title, executor, creator, department, description, endDate } = req.body || {};
    const { data: executorData } = await axios.get(`${DB_URL}/users/${executor}`);
    const { data: creatorData } = await axios.get(`${DB_URL}/users/${creator}`);
    const { data: departmentData } = await axios.get(`${DB_URL}/departments/${department}`);
    const taskToUpdate = {
      id,
      title,
      executor: executorData,
      creator: creatorData,
      department: departmentData,
      description,
      endDate,
    };
    let newTask;

    if (id) {
      const { data: oldTask } = await axios.get(`${DB_URL}/tasks/${id}`);
      const { data } = await axios.put(`${DB_URL}/tasks/${id}`, { ...oldTask, ...taskToUpdate });
      newTask = data;
    } else {
      const { data } = await axios.post(`${DB_URL}/tasks`, {
        ...taskToUpdate,
        createdDate: '2024-09-20T15:40:45.417588Z',
        status: 'TO_DO',
      });
      newTask = data;
    }

    if (newTask) {
      res.send(resConstructor.success(newTask));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

router.patch('/api/v1/tasks/:id', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    const { data: oldTask } = await axios.get(`${DB_URL}/tasks/${id}`);
    const { data: newTask } = await axios.put(`${DB_URL}/tasks/${id}`, { ...oldTask, status });

    res.send(resConstructor.success(newTask));
  } catch (error) {
    res.sendStatus(404);
  }
});

router.delete('/api/v1/tasks/:id', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.delete(`${DB_URL}/tasks/${id}`);

    if (data) {
      res.send(resConstructor.success(void 0));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

export default router;
