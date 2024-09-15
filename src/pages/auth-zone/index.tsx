import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import PageLoader from '@components/page-loader';
import useTelegram from '@hooks/telegram';
import Error from '@components/error';
import { ContainerStyled } from '@styles/container';
import { useAppDispatch, useAppSelector } from '@store/store';
import selectors from '@store/selectors';
import slices from '@store/slices';

const AuthZone = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { telegram } = useTelegram();
  const [errorMessage, setErrorMessage] = useState('');

  const isAuthLoading = useAppSelector(selectors.auth.isLoading);
  const authError = useAppSelector(selectors.auth.error);
  const isAuth = useAppSelector(selectors.auth.isAuth);

  const isLoading = isAuthLoading;
  const isError = errorMessage || !!authError;
  const isOutletVisible = isAuth && !isError && !isLoading;

  const handleAuthAsync = useCallback(() => {
    if (!telegram?.initData) {
      setErrorMessage(t('no.telegram.message'));
      return;
    }

    if (!isAuth) {
      setErrorMessage('');
      dispatch(
        slices.auth.authAsync({
          initData: telegram?.initData,
          user: String(telegram?.initDataUnsafe.user?.id),
          hash: telegram?.initDataUnsafe.hash,
        }),
      );
    }
  }, [dispatch, isAuth, t, telegram?.initData, telegram?.initDataUnsafe.hash, telegram?.initDataUnsafe.user?.id]);

  useEffect(() => {
    if (!isAuth && !authError) {
      handleAuthAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <ContainerStyled>
      {isOutletVisible && <Outlet />}
      {isLoading && <PageLoader />}
      {isError && <Error isFullScreen description={authError?.message || errorMessage} onClick={handleAuthAsync} />}
    </ContainerStyled>
  );
};

export default AuthZone;
