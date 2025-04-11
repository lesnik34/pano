import React, { Key, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Tab, Tabs } from '@heroui/react';

import { TASK_PARAMS } from '@constants/pages';
import { ViewQueryEnum } from '@api/types';
import selectors from '@store/selectors';

interface TargetI {
  isLoading?: boolean;
}

const Target: React.FC<TargetI> = ({ isLoading }) => {
  const view = useSelector(selectors.tasks.view);
  const setSearchParams = useSearchParams()[1];
  const { t } = useTranslation();

  const onTabClick = useCallback(
    (selection: Key) => {
      setSearchParams((params) => {
        params.set(TASK_PARAMS.view, selection as ViewQueryEnum);
        return params;
      });
    },
    [setSearchParams],
  );

  return (
    <div className="mb-4">
      <Tabs
        onSelectionChange={onTabClick}
        selectedKey={view}
        isDisabled={isLoading}
        variant="solid"
        color="primary"
        radius="lg"
        size="lg"
        fullWidth
      >
        <Tab key={ViewQueryEnum.executor} title={t('appointed.tasks')} />
        <Tab key={ViewQueryEnum.creator} title={t('created.tasks')} />
      </Tabs>
    </div>
  );
};

export default Target;
