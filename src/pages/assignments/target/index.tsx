import { Tab, Tabs } from '@heroui/react';
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
        selectedKey={target.creator ? 'creator' : 'executor'}
        variant="solid"
        size="lg"
        fullWidth
        color="primary"
        radius="lg"
      >
        <Tab key="executor" title={t('appointed.assignments')} />
        <Tab key="creator" title={t('created.assignments')} />
      </Tabs>
    </div>
  );
};

export default Target;
