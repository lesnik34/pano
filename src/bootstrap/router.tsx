import { Routes, Route } from 'react-router-dom';

import Assignments from '@pages/assignments';
import Assignment from '@pages/assignment';
import NotFound from '@pages/not-found';
import AuthZone from '@pages/auth-zone';
import Tasks from '@pages/tasks';
import Task from '@pages/task';
import Main from '@pages/main';
import NewTask from '@pages/new-task';
import NewAssignment from '@pages/new-assignment';
import Marks from '@pages/marks';

import {
  DASH_PAGE,
  PAGE_BASE,
  PAGE_NEW_TASK,
  PAGE_ASSIGNMENTS,
  PAGE_TASKS,
  PAGE_NEW_ASSIGNMENT,
  PAGE_MARKS,
} from '@constants/pages';

const Router = () => (
  <Routes>
    <Route path={PAGE_BASE} element={<Main />} />
    <Route path={DASH_PAGE} element={<AuthZone />}>
      <Route path={PAGE_TASKS} element={<Tasks />} />
      <Route path={PAGE_NEW_TASK} element={<NewTask />} />
      <Route path={`${PAGE_TASKS}/:id`} element={<Task />} />
      <Route path={PAGE_ASSIGNMENTS} element={<Assignments />} />
      <Route path={PAGE_NEW_ASSIGNMENT} element={<NewAssignment />} />
      <Route path={`${PAGE_ASSIGNMENTS}/:id`} element={<Assignment />} />
      <Route path={PAGE_MARKS} element={<Marks />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
