import React, { useCallback, useState } from 'react';
import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiFilter } from 'react-icons/fi';

import { ASSIGNMENTS_PARAMS } from '@constants/pages';
import { useAppSelector } from '@store/store';
import selectors from '@store/selectors';

import Status from './status';
import { PopoverWrapper, SectionStyled } from './parameters.styled';

interface ParametersI {
  isLoading?: boolean;
}

const Parameters: React.FC<ParametersI> = ({ isLoading }) => {
  const { t } = useTranslation();
  const [isPopoverVisible, setPopoverVision] = useState(false);
  const setSearchParams = useSearchParams()[1];

  const assignmentsStoreParams = useAppSelector(selectors.assignments.params);
  const [currentStatus, setCurrentStatus] = useState(assignmentsStoreParams.statuses);

  const onSubmit = useCallback(() => {
    setSearchParams((params) => {
      params.set(ASSIGNMENTS_PARAMS.page, '1');
      params.set(ASSIGNMENTS_PARAMS.status, String(currentStatus));
      return params;
    });

    setPopoverVision(false);
  }, [currentStatus, setSearchParams]);

  return (
    <Popover
      placement="bottom-start"
      onOpenChange={setPopoverVision}
      shouldCloseOnScroll={false}
      isOpen={isPopoverVisible}
      shouldBlockScroll
    >
      <Badge color="primary" content={assignmentsStoreParams.statuses.length}>
        <PopoverTrigger>
          <Button isIconOnly isDisabled={isLoading} variant="flat" color="default" startContent={<FiFilter />} />
        </PopoverTrigger>
      </Badge>

      <PopoverContent>
        <PopoverWrapper>
          <SectionStyled>
            <Status currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />
          </SectionStyled>

          <Button onPress={onSubmit} className="mt-3" color="primary" fullWidth>
            {t('submit.text')}
          </Button>
        </PopoverWrapper>
      </PopoverContent>
    </Popover>
  );
};

export default Parameters;
