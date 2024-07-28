import ym from 'react-yandex-metrika';

export const yandexReachGoal = (target: string) => {
  const id = import.meta.env.VITE_YANDEX_ANALYTICS_ID;
  const isDevelopment = import.meta.env.DEV;

  if (id === undefined || isDevelopment) {
    console.log(`%c[YandexMetrika](ReachGoal)`, `color: orange`, target);
    return;
  }

  ym('reachGoal', target);
};
