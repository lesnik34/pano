import TagManager from 'react-gtm-module';

const GTM = () => {
  const id = import.meta.env.VITE_GTM_ID;
  const isDevelopment = import.meta.env.DEV;

  if (id === undefined || isDevelopment || typeof window === 'undefined') {
    return null;
  }

  TagManager.initialize({
    gtmId: id,
  });

  return null;
};

export default GTM;
