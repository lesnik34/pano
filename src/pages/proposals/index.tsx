import useTelegram from '@hooks/telegram';

import { Link } from '@nextui-org/react';
import Layout from '@/components/global/layout';

import { TitleStyled } from './proposals.styled';

const Proposals = () => {
  const { telegram } = useTelegram();

  console.log(telegram);

  return (
    <Layout>
      <TitleStyled>Proposals</TitleStyled>

      <Link href="/dashboard/tasks">Button tasks</Link>
    </Layout>
  );
};

export default Proposals;
