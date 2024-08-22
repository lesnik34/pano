import React, { useCallback, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { FiFilter } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { selectors, useAppSelector } from '@store/index';
import { TASK_PARAMS } from '@constants/pages';

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
  const [currentStatus, setCurrentStatus] = useState(tasksStoreParams.status);

  const onSubmit = useCallback(() => {
    setSearchParams((params) => {
      params.set(TASK_PARAMS.page, '1');
      params.set(TASK_PARAMS.status, String(currentStatus));
      return params;
    });

    setPopoverVision(false);
  }, [currentStatus, setSearchParams]);

  return (
    <Popover placement="bottom-start" isOpen={isPopoverVisible} onOpenChange={setPopoverVision}>
      <PopoverTrigger>
        <Button isLoading={isLoading} variant="flat" color="default" startContent={<FiFilter />}>
          {t('filter.text')}
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverWrapper>
          <SectionStyled>
            <Status setCurrentStatus={setCurrentStatus} />
          </SectionStyled>

          <Button onClick={onSubmit} className="mt-3" color="primary" fullWidth>
            {t('submit.text')}
          </Button>
        </PopoverWrapper>
      </PopoverContent>
    </Popover>
  );
};

export default Parameters;
