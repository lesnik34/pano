import { useTranslation } from 'react-i18next';

import Layout from '@components/global/layout';
import { WrapperStyled } from './marks.styled';

const Marks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <WrapperStyled>{t('marks.dummy.message')}</WrapperStyled>
    </Layout>
  );
};

export default Marks;
