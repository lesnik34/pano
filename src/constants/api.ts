import { BaseErrorI } from '@api/types';
import i18n from '@utils/i18next';

export const API_PREFIX = '';

export const API_URLS = {
  AUTH_USER: `${API_PREFIX}/v1/auth`,
  USER: `${API_PREFIX}/v1/users`,
};

export const DEFAULT_ERROR_RESPONSE: BaseErrorI = {
  status: false,
  error: {
    code: '0',
    message: i18n.t('default.error.message'),
  },
};
