const useTelegram = () => {
  const telegram = Telegram.WebApp;
  const { user } = telegram.initDataUnsafe;

  return { telegram, user };
};

export default useTelegram;
