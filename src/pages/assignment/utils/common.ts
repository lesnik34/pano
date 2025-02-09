import { FieldValues } from 'react-hook-form';

export const parseAssignmentData = (assignment: FieldValues) => {
  const { executor, creator, department, ...otherData } = assignment;

  return {
    ...otherData,
    executor: executor.id,
    department: department.id,
  };
};
