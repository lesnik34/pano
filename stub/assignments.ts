import { Router } from 'express';
import axios from 'axios';
import { wait, resConstructor, filterTasks } from './utils/common';
import { DB_URL } from './utils/constants';

const INIT_TIMEOUT = 1000;

const router = Router();

router.get('/api/v1/assignments', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { page, size = '5', ...params } = req.query;
    const { data } = await axios.get(`${DB_URL}/assignments`);

    const itemsPerPage = Number(size);
    const currentPage = Number(page) + 1;

    const dataFromIndex = currentPage * itemsPerPage - itemsPerPage;
    const dataTillIndex = currentPage * itemsPerPage;

    const filteredContent = filterTasks(data, params);
    const currentContent = filteredContent.slice(dataFromIndex, dataTillIndex);

    const totalPages = Math.ceil(Number(filteredContent.length) / itemsPerPage);
    const last = totalPages === currentPage;

    if (filteredContent) {
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
          totalElements: filteredContent.length,
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

router.get('/api/v1/assignments/:id', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${DB_URL}/assignments/${id}`);

    if (data) {
      res.send(resConstructor.success(data));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post('/api/v1/assignments', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { id, title, executor, creator, department, description } = req.body || {};
    const { data: executorData } = await axios.get(`${DB_URL}/users/${executor}`);
    const { data: creatorData } = await axios.get(`${DB_URL}/users/${creator}`);
    const { data: departmentData } = await axios.get(`${DB_URL}/departments/${department}`);
    const assignmentToUpdate = {
      id,
      title,
      executor: executorData,
      creator: creatorData,
      department: departmentData,
      description,
    };
    let newAssignment;

    if (id) {
      const { data: oldAssignment } = await axios.get(`${DB_URL}/assignments/${id}`);
      const { data } = await axios.put(`${DB_URL}/assignments/${id}`, { ...oldAssignment, ...assignmentToUpdate });
      newAssignment = data;
    } else {
      const { data } = await axios.post(`${DB_URL}/assignments`, {
        ...assignmentToUpdate,
        createdDate: '2024-09-20T15:40:45.417588Z',
        status: 'TO_DO',
      });
      newAssignment = data;
    }

    if (newAssignment) {
      res.send(resConstructor.success(newAssignment));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

router.patch('/api/v1/assignments/:id', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    const { data: oldAssignment } = await axios.get(`${DB_URL}/assignments/${id}`);
    const { data: newAssignment } = await axios.put(`${DB_URL}/assignments/${id}`, { ...oldAssignment, status });

    res.send(resConstructor.success(newAssignment));
  } catch (error) {
    res.sendStatus(404);
  }
});

router.delete('/api/v1/assignments/:id', wait(INIT_TIMEOUT), async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.delete(`${DB_URL}/assignments/${id}`);

    if (data) {
      res.send(resConstructor.success(void 0));
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

export default router;
