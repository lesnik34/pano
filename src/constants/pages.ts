import { AiOutlineAppstore, AiOutlineAudit } from 'react-icons/ai';
import { BiTrophy } from 'react-icons/bi';

export const PAGE_BASE = '/';

export const DASH_PAGE = '/dashboard';

export const PAGE_TASKS = '/dashboard/tasks';

export const PAGE_PROPOSALS = '/dashboard/proposals';

export const NAV_LINKS = [
  {
    title: 'Задачи',
    url: '/dashboard/tasks',
    icon: AiOutlineAppstore,
  },
  {
    title: 'Заявки',
    url: '/dashboard/proposals',
    icon: AiOutlineAudit,
  },
  {
    title: 'Оценки',
    url: '/dashboard/marks',
    icon: BiTrophy,
  },
];
