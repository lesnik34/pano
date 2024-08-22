import { TaskStatus } from '@api/types';
import tw from 'twin.macro';

export const getTaskStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.toDo:
      return tw`bg-content4`;
    case TaskStatus.canceled:
      return tw`bg-warning`;
    case TaskStatus.done:
      return tw`bg-success`;
    case TaskStatus.inProgress:
      return tw`bg-primary`;

    default:
      return tw`bg-content4`;
  }
};
