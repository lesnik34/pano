import React, { useCallback } from 'react';
import { Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';

interface StubI {
  setCurrentStatus: (status: string) => void;
  statusKeys: {
    actual: string;
    archive: string;
  };
}

const Stub: React.FC<StubI> = ({ setCurrentStatus, statusKeys }) => {
  const { t } = useTranslation();

  const onStatusClick = useCallback(
    (status: string) => () => {
      setCurrentStatus(status);
    },
    [setCurrentStatus],
  );

  return (
    <div className="p-1 gap-2 flex">
      <Button
        className="py-1 px-3 h-8 min-w-min"
        size="md"
        radius="full"
        color="primary"
        variant="light"
        onPress={onStatusClick(statusKeys.actual)}
      >
        {t('assignments.status.active')}
      </Button>

      <Button
        className="py-1 px-3 h-8 min-w-min"
        size="md"
        radius="full"
        color="primary"
        variant="light"
        onPress={onStatusClick(statusKeys.archive)}
      >
        {t('assignments.status.archive')}
      </Button>
    </div>
  );
};

export default Stub;
