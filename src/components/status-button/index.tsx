import React, { useCallback, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { IoIosArrowUp } from 'react-icons/io';

import { TaskStatus } from '@api/types';
import { getTaskStatusProperties } from '@styles/utils/common';
import { Wrapper, StatusesWrapper, StatusWrapper } from './status.styled';

interface StatusButtonI {
  status?: TaskStatus;
  availableStatuses?: Array<TaskStatus>;
  isLoading?: boolean;
  onClick?: (status: TaskStatus) => void;
}

const StatusButton: React.FC<StatusButtonI> = ({ status, availableStatuses, isLoading, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getCurrentProperties = useCallback((currentStatus?: TaskStatus) => getTaskStatusProperties(currentStatus), []);
  const currentProperties = getCurrentProperties(status);

  const onOpenChange = useCallback((popoverStatus: boolean) => {
    setIsOpen(popoverStatus);
  }, []);

  const onPopoverClick = useCallback(
    (taskStatus: TaskStatus) => () => {
      setIsOpen(false);
      onClick?.(taskStatus);
    },
    [onClick],
  );

  return (
    <Wrapper>
      <Popover placement="top" color="default" isOpen={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger>
          <Button
            endContent={availableStatuses ? <IoIosArrowUp /> : null}
            fullWidth
            isLoading={isLoading}
            size="lg"
            color={currentProperties.color}
            variant="solid"
            className="text-white fill-white"
          >
            {currentProperties.text}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <StatusesWrapper>
            {availableStatuses?.map((element) => (
              <StatusWrapper key={element}>
                <Button
                  onClick={onPopoverClick(element)}
                  className="text-white"
                  fullWidth
                  color={getCurrentProperties(element).color}
                  variant="solid"
                >
                  {getCurrentProperties(element).text}
                </Button>
              </StatusWrapper>
            ))}
          </StatusesWrapper>
        </PopoverContent>
      </Popover>
    </Wrapper>
  );
};

export default StatusButton;
