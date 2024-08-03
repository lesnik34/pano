import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { store } from '@store/index';
import useTelegram from '@hooks/telegram';
import { GlobalStyles as BaseStyles } from 'twin.macro';

import theme from '@styles/theme';
import GlobalStyle from '@styles/global';
import '@utils/i18next';
import '@styles/index.css';

import Router from './router';

const App = () => {
  const { telegram } = useTelegram();
  const navigate = useNavigate();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NextUIProvider navigate={navigate}>
          <div className={`${telegram.colorScheme} text-foreground bg-background`}>
            <GlobalStyle />
            <BaseStyles />

            <Router />
          </div>
        </NextUIProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
