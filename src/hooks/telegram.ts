import { TelegramWebApps } from 'telegram-webapps';
import theme from '@styles/theme';

import telegramMock from '../../stub/jsons/telegram-mock.json';

const useTelegram = () => {
  let telegram = Telegram?.WebApp;
  if (process.env.NODE_ENV === 'development') {
    telegram = telegramMock as unknown as TelegramWebApps.WebApp;
  }

  if (!telegram) {
    return {};
  }

  const { user } = telegram.initDataUnsafe;
  const initOptions = () => {
    if (!telegram.isExpanded) {
      telegram.expand?.();
    }

    document.body.classList.add('dark', 'text-foreground', 'bg-background');
    telegram.setBackgroundColor?.(theme.dark.colors.background);
    telegram.setHeaderColor?.(theme.dark.colors.header);
    telegram.disableVerticalSwipes?.();
    telegram.ready?.();
  };

  return { telegram, user, initOptions };
};

export default useTelegram;
