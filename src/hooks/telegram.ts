import theme from '@styles/theme';

const useTelegram = () => {
  const telegram = Telegram?.WebApp;
  if (!telegram) {
    return {};
  }

  const { user } = telegram.initDataUnsafe;
  const initOptions = () => {
    if (!telegram.isExpanded) {
      telegram.expand();
    }

    document.body.classList.add('dark', 'text-foreground', 'bg-background');
    telegram.setBackgroundColor(theme.dark.colors.background);
    telegram.setHeaderColor(theme.dark.colors.header);
    telegram.disableVerticalSwipes();
    telegram.ready();
  };

  return { telegram, user, initOptions };
};

export default useTelegram;
