import { Tab, Tabs } from '@nextui-org/react';
import React, { Key, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface TargetI {
  isLoading?: boolean;
  userId?: number;
  setTarget: (target: { executor?: number; creator?: number }) => void;
  target: { executor?: number; creator?: number };
}

const Target: React.FC<TargetI> = ({ setTarget, userId, isLoading, target }) => {
  const { t } = useTranslation();

  const onTabClick = useCallback(
    (selection: Key) => {
      setTarget({ [selection as string]: userId });
    },
    [setTarget, userId],
  );

  return (
    <div className="mb-4">
      <Tabs
        isDisabled={isLoading}
        onSelectionChange={onTabClick}
        variant="solid"
        size="lg"
        fullWidth
        color="primary"
        radius="lg"
      >
        <Tab key="executor" title={t('appointed.tasks')} />
        <Tab key="creator" title={t('created.tasks')} />
      </Tabs>
    </div>
  );
};

export default Target;
