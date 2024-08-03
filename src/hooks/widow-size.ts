import { useState, useEffect } from 'react';

import { DefaultTheme } from 'styled-components';

const useWindowSize = (theme: DefaultTheme) => {
  const isDesktopWidth = () =>
    typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${theme.device.minDesktopWidth})`).matches : false;
  const isTabletWidth = () =>
    typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${theme.device.minTabletWidth})`).matches : false;
  const isRetinaScreen = () =>
    typeof window !== 'undefined' ? window.matchMedia('(min-resolution: 2dppx)').matches : false;

  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  const [device, setDevice] = useState<{
    isDesktopWidth: boolean | undefined;
    isTabletWidth: boolean | undefined;
    isMobileWidth: boolean | undefined;
    isRetina: boolean | undefined;
  }>({
    isDesktopWidth: undefined,
    isTabletWidth: undefined,
    isMobileWidth: undefined,
    isRetina: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const isTablet = isTabletWidth();
      const isDesktop = isDesktopWidth();
      const isMobile = !isDesktop && !isTablet;
      const isRetina = isRetinaScreen();

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setDevice({
        isDesktopWidth: isDesktop,
        isTabletWidth: isTablet,
        isMobileWidth: isMobile,
        isRetina,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { windowSize, device };
};

export default useWindowSize;
