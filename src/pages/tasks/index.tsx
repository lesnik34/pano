import { Link } from '@nextui-org/react';

import useTelegram from '@hooks/telegram';
import Layout from '@components/global/layout';

import { TitleStyled } from './tasks.styled';

const Tasks = () => {
  const { telegram } = useTelegram();

  console.log(telegram);

  return (
    <Layout>
      <TitleStyled>Tasks</TitleStyled>

      <Link href="/proposals">Button proposals</Link>
    </Layout>
  );
};

export default Tasks;
