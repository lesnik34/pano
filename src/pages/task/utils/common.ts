import { FieldValues } from 'react-hook-form';

export const parseTaskData = (task: FieldValues) => {
  const { executor, creator, department, ...otherData } = task;

  return {
    ...otherData,
    executor: executor.id,
    department: department.id,
  };
};
