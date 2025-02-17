import React, { useCallback, useState } from 'react';
import { Badge, Button, Popover, PopoverContent, PopoverTrigger, ScrollShadow } from '@heroui/react';
import { FiFilter } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TASK_PARAMS } from '@constants/pages';
import { useAppDispatch, useAppSelector } from '@store/store';
import selectors from '@store/selectors';
import slices from '@store/slices';

import Status from './status';
import User from './user';
import { PopoverWrapper, SectionStyled } from './parameters.styled';

interface ParametersI {
  isLoading?: boolean;
}

const Parameters: React.FC<ParametersI> = ({ isLoading }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isPopoverVisible, setPopoverVision] = useState(false);
  const setSearchParams = useSearchParams()[1];

  const tasksStoreParams = useAppSelector(selectors.tasks.params);
  const taskViewedUser = useAppSelector(selectors.tasks.viewedUser);

  const [currentStatus, setCurrentStatus] = useState(tasksStoreParams.statuses);
  const [viewedUser, setViewedUser] = useState(taskViewedUser);
  const badgeContent = taskViewedUser ? <FaRegUser className="w-[7px]" /> : tasksStoreParams.statuses.length;

  const onSubmit = useCallback(() => {
    setSearchParams((params) => {
      params.set(TASK_PARAMS.page, '1');
      params.set(TASK_PARAMS.status, String(currentStatus));
      return params;
    });

    dispatch(slices.tasks.setViewedUser(viewedUser));

    setPopoverVision(false);
  }, [currentStatus, dispatch, setSearchParams, viewedUser]);

  return (
    <Popover
      placement="bottom-start"
      onOpenChange={setPopoverVision}
      shouldCloseOnScroll={false}
      isOpen={isPopoverVisible}
      shouldBlockScroll
      backdrop="opaque"
    >
      <Badge color={taskViewedUser ? 'secondary' : 'primary'} content={badgeContent}>
        <PopoverTrigger>
          <Button isIconOnly isDisabled={isLoading} variant="flat" color="default" startContent={<FiFilter />} />
        </PopoverTrigger>
      </Badge>

      <PopoverContent>
        <ScrollShadow className="w-full max-h-[55vh]">
          <PopoverWrapper>
            <SectionStyled>
              <Status currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />
            </SectionStyled>

            <SectionStyled>
              <User viewedUser={viewedUser} setViewedUser={setViewedUser} />
            </SectionStyled>

            <Button onPress={onSubmit} className="mt-3" color="primary" fullWidth>
              {t('submit.text')}
            </Button>
          </PopoverWrapper>
        </ScrollShadow>
      </PopoverContent>
    </Popover>
  );
};

export default Parameters;
