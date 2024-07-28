import ym from 'react-yandex-metrika';

export const yandexReachGoal = (target: string) => {
  const id = process.env.YANDEX_ANALYTICS_ID;
  const isDevelopment = process.env.ENV_MODE === 'dev';

  if (id === undefined || isDevelopment) {
    console.log(`%c[YandexMetrika](ReachGoal)`, `color: orange`, target);
    return;
  }

  ym('reachGoal', target);
};
