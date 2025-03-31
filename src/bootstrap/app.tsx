import { useEffect } from 'react';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import useTelegram from '@hooks/telegram';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles as BaseStyles } from 'twin.macro';
import { HeroUIProvider, ToastProvider } from '@heroui/react';

import GlobalStyle from '@styles/global';
import theme from '@styles/theme';
import '@utils/i18next';
import '@styles/index.css';

import Router from './router';

const App = () => {
  const { initOptions } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    initOptions?.();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HeroUIProvider locale="ru-RU" navigate={navigate} disableAnimation disableRipple>
          <ToastProvider placement="top-center" toastOffset={10} />
          <GlobalStyle />
          <BaseStyles />

          <Router />
        </HeroUIProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
