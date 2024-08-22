const useTelegram = () => {
  const telegram = Telegram.WebApp;
  const { user } = telegram.initDataUnsafe;

  const initOptions = () => {
    if (!telegram.isExpanded) {
      telegram.expand();
    }

    document.body.classList.add(`${telegram.colorScheme ?? 'dark'}`, 'text-foreground', 'bg-background');
    telegram.disableVerticalSwipes();
    telegram.ready();
  };

  return { telegram, user, initOptions };
};

export default useTelegram;
