import tw, { TwStyle } from 'twin.macro';
import { TaskStatus, AssignmentStatus } from '@api/types';
import i18n from '@utils/i18next';

export const getStatusProperties = (status?: TaskStatus | AssignmentStatus) => {
  let style: TwStyle = tw``;
  let color: 'default' | 'primary' | 'success' | 'warning' = 'default';
  let text = '';

  switch (status) {
    case TaskStatus.toDo:
      style = tw`bg-content4`;
      color = 'default';
      text = i18n.t('task.status.to.do');
      break;
    case TaskStatus.canceled:
      style = tw`bg-warning`;
      color = 'warning';
      text = i18n.t('task.status.canceled');
      break;
    case TaskStatus.done:
      style = tw`bg-success`;
      color = 'success';
      text = i18n.t('task.status.done');
      break;
    case TaskStatus.inProgress:
      style = tw`bg-primary`;
      color = 'primary';
      text = i18n.t('task.status.in.progress');
      break;

    default:
      style = tw`bg-content4`;
      color = 'default';
      text = '';
  }

  return {
    style,
    color,
    text,
  };
};
