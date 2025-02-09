import React, { useCallback, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { FiFilter } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ASSIGNMENTS_PARAMS } from '@constants/pages';

import { PopoverWrapper, SectionStyled } from './parameters.styled';

interface ParametersI {
  isLoading?: boolean;
}

const Parameters: React.FC<ParametersI> = ({ isLoading }) => {
  const { t } = useTranslation();
  const [isPopoverVisible, setPopoverVision] = useState(false);
  const setSearchParams = useSearchParams()[1];

  const onSubmit = useCallback(() => {
    setSearchParams((params) => {
      params.set(ASSIGNMENTS_PARAMS.page, '1');
      return params;
    });

    setPopoverVision(false);
  }, [setSearchParams]);

  return (
    <Popover
      placement="bottom-start"
      onOpenChange={setPopoverVision}
      shouldCloseOnScroll={false}
      isOpen={isPopoverVisible}
      shouldBlockScroll
    >
      <PopoverTrigger>
        <Button isIconOnly isDisabled={isLoading} variant="flat" color="default" startContent={<FiFilter />} />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverWrapper>
          <SectionStyled />

          <Button onPress={onSubmit} className="mt-3" color="primary" fullWidth>
            {t('submit.text')}
          </Button>
        </PopoverWrapper>
      </PopoverContent>
    </Popover>
  );
};

export default Parameters;
