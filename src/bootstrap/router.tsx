import { Routes, Route } from 'react-router-dom';

import Proposals from '@pages/proposals';
import NotFound from '@pages/not-found';
import AuthZone from '@pages/auth-zone';
import Tasks from '@pages/tasks';
import Task from '@pages/task';
import Main from '@pages/main';
import NewTask from '@pages/new-task';

import { DASH_PAGE, PAGE_BASE, PAGE_NEW_TASK, PAGE_PROPOSALS, PAGE_TASKS } from '@constants/pages';

const Router = () => (
  <Routes>
    <Route path={PAGE_BASE} element={<Main />} />
    <Route path={DASH_PAGE} element={<AuthZone />}>
      <Route path={PAGE_TASKS} element={<Tasks />} />
      <Route path={PAGE_NEW_TASK} element={<NewTask />} />
      <Route path={`${PAGE_TASKS}/:id`} element={<Task />} />
      <Route path={PAGE_PROPOSALS} element={<Proposals />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Router;
