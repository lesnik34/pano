import { YMInitializer } from 'react-yandex-metrika';

const Metrika = () => {
  const id = import.meta.env.VITE_YANDEX_ANALYTICS_ID;
  const isDevelopment = import.meta.env.DEV;

  if (id === undefined || isDevelopment || typeof window === 'undefined') {
    return null;
  }

  return (
    <YMInitializer
      accounts={[parseInt(id, 10)]}
      options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      }}
    />
  );
};

export default Metrika;
