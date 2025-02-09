import { AiOutlineAppstore, AiOutlineAudit } from 'react-icons/ai';
import { BiTrophy } from 'react-icons/bi';

export const PAGE_BASE = '/';

export const DASH_PAGE = '/dashboard';

export const PAGE_TASKS = '/dashboard/tasks';

export const PAGE_NEW_TASK = '/dashboard/tasks/new';

export const PAGE_ASSIGNMENTS = '/dashboard/assignments';

export const PAGE_NEW_ASSIGNMENT = '/dashboard/assignments/new';

export const PAGE_MARKS = '/dashboard/marks';

export const NAV_LINKS = [
  {
    title: 'Задачи',
    url: '/dashboard/tasks',
    icon: AiOutlineAppstore,
  },
  {
    title: 'Заявки',
    url: '/dashboard/assignments',
    icon: AiOutlineAudit,
  },
  {
    title: 'Оценки',
    url: '/dashboard/marks',
    icon: BiTrophy,
  },
];

export const TASK_PARAMS = {
  page: 'page',
  status: 'status',
};

export const ASSIGNMENTS_PARAMS = {
  page: 'page',
  status: 'status',
};
