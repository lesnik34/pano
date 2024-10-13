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
    telegram.setBackgroundColor('#18191A');
    telegram.setHeaderColor('#1E1E1F');
    telegram.disableVerticalSwipes();
    telegram.ready();
  };

  return { telegram, user, initOptions };
};

export default useTelegram;
