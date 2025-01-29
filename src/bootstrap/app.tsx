import { useEffect } from 'react';
import { HeroUIProvider } from "@heroui/react";
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { store } from '@store/store';
import useTelegram from '@hooks/telegram';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles as BaseStyles } from 'twin.macro';

import theme from '@styles/theme';
import GlobalStyle from '@styles/global';
import '@utils/i18next';
import '@styles/index.css';

import Router from './router';
import 'react-toastify/dist/ReactToastify.css';

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
          <GlobalStyle />
          <BaseStyles />
          <ToastContainer theme="dark" position="top-center" />

          <Router />
        </HeroUIProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
