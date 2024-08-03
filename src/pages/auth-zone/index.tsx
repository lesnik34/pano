import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { selectors, useAppDispatch, useAppSelector, slices } from '@store/index';
import PageLoader from '@components/page-loader';
import useTelegram from '@hooks/telegram';
import PageError from '@components/error';
import { ContainerStyled } from '@styles/container';

const AuthZone = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { telegram } = useTelegram();
  const [errorMessage, setErrorMessage] = useState('');

  const isLoading = useAppSelector(selectors.auth.isLoading);
  const isError = useAppSelector(selectors.auth.isError);
  const isAuth = useAppSelector(selectors.auth.isAuth);
  const isOutletVisible = isAuth && !isError && !isLoading;

  const handleAuthAsync = useCallback(() => {
    if (!telegram.initData) {
      setErrorMessage(t('no.telegram.message'));
    }

    dispatch(slices.authAsync(telegram.initData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [telegram.initData]);

  useEffect(() => {
    handleAuthAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isOutletVisible && <Outlet />}
      {isLoading && <PageLoader />}
      {isError && (
        <ContainerStyled>
          <PageError description={errorMessage} onClick={handleAuthAsync} />
        </ContainerStyled>
      )}
    </>
  );
};

export default AuthZone;
