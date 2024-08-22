import { createListenerMiddleware, isRejected } from '@reduxjs/toolkit';
import { DEFAULT_ERROR_RESPONSE } from '@constants/api';
import { clearAuthUser, setError } from '../slices/authSlice';

export const authMiddleware = createListenerMiddleware();
const startAppListening = authMiddleware.startListening;

interface ActionI {
  payload: {
    status: number;
  };
}

startAppListening({
  matcher: isRejected,
  effect: (() => {
    let attempts = 0;

    return (action, listenerApi) => {
      const { payload } = (action as unknown as ActionI) || {};
      if (payload?.status !== 401) {
        return;
      }

      attempts += 1;
      listenerApi.dispatch(clearAuthUser());

      if (attempts > 1) {
        listenerApi.dispatch(setError(DEFAULT_ERROR_RESPONSE.error));
      }
    };
  })(),
});
