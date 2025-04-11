import React, { useCallback, useState } from 'react';
import { Badge, Button, Popover, PopoverContent, PopoverTrigger, ScrollShadow } from '@heroui/react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaRegUser } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';

import { ASSIGNMENTS_PARAMS, VIEWED_SELF } from '@constants/pages';
import { useAppSelector } from '@store/store';
import selectors from '@store/selectors';

import Status from './status';
import User from './user';

import { PopoverWrapper, SectionStyled } from './parameters.styled';

interface ParametersI {
  isLoading?: boolean;
}

const Parameters: React.FC<ParametersI> = ({ isLoading }) => {
  const { t } = useTranslation();
  const [isPopoverVisible, setPopoverVision] = useState(false);
  const setSearchParams = useSearchParams()[1];

  const assignmentsStoreParams = useAppSelector(selectors.assignments.params);
  const isUserSelected = assignmentsStoreParams.user !== VIEWED_SELF;

  const [currentStatus, setCurrentStatus] = useState(assignmentsStoreParams.statuses);
  const [viewedUser, setViewedUser] = useState(assignmentsStoreParams.user);

  const onSubmit = useCallback(() => {
    setSearchParams((params) => {
      params.set(ASSIGNMENTS_PARAMS.page, '1');
      params.set(ASSIGNMENTS_PARAMS.status, String(currentStatus));
      params.set(ASSIGNMENTS_PARAMS.user, viewedUser);

      return params;
    });

    setPopoverVision(false);
  }, [currentStatus, setSearchParams, viewedUser]);

  const badgeContent = isUserSelected ? <FaRegUser className="w-[7px]" /> : assignmentsStoreParams.statuses.length;

  return (
    <Popover
      placement="bottom-start"
      onOpenChange={setPopoverVision}
      shouldCloseOnScroll={false}
      isOpen={isPopoverVisible}
      shouldBlockScroll
      backdrop="opaque"
    >
      <Badge color={isUserSelected ? 'secondary' : 'primary'} content={badgeContent}>
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
