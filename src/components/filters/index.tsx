import React, { useCallback, useState } from 'react';
import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { FiFilter } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TASK_PARAMS } from '@constants/pages';
import { useAppSelector } from '@store/store';
import selectors from '@store/selectors';

import { PopoverWrapper, SectionStyled } from './parameters.styled';
import Status from './status';

interface ParametersI {
  isLoading?: boolean;
}

const Parameters: React.FC<ParametersI> = ({ isLoading }) => {
  const { t } = useTranslation();
  const [isPopoverVisible, setPopoverVision] = useState(false);
  const setSearchParams = useSearchParams()[1];

  const tasksStoreParams = useAppSelector(selectors.tasks.params);
  const [currentStatus, setCurrentStatus] = useState(tasksStoreParams.statuses);
  const activeLength = tasksStoreParams.statuses.length;

  const onSubmit = useCallback(() => {
    setSearchParams((params) => {
      params.set(TASK_PARAMS.page, '1');
      params.set(TASK_PARAMS.status, String(currentStatus));
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
      <Badge color="primary" content={activeLength}>
        <PopoverTrigger>
          <Button isIconOnly isDisabled={isLoading} variant="flat" color="default" startContent={<FiFilter />} />
        </PopoverTrigger>
      </Badge>

      <PopoverContent>
        <PopoverWrapper>
          <SectionStyled>
            <Status setCurrentStatus={setCurrentStatus} />
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
