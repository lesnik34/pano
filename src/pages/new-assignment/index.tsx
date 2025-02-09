import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import Layout from '@components/global/layout';
import AssignmentComponent from '@components/assignment';
import { EMPTY_ASSIGNMENT } from '@constants/common';
import { Button } from '@heroui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { PAGE_ASSIGNMENTS } from '@constants/pages';
import { useNavigate } from 'react-router-dom';
import selectors from '@store/selectors';
import { useAppSelector } from '@store/store';

import { WrapperStyled } from './new-assignment.styled';
import Controls from './controls';

const NewAssignment = () => {
  const userId = useAppSelector(selectors.auth.userId);
  const { t } = useTranslation();
  const formMethods = useForm();
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(PAGE_ASSIGNMENTS);
  }, [navigate]);

  return (
    <Layout navHidden>
      <FormProvider {...formMethods}>
        <Button onPress={onBackClick} startContent={<IoIosArrowBack />} variant="light">
          {t('move.to.assignments')}
        </Button>

        <WrapperStyled>
          <AssignmentComponent title={t('create.assignment.headline')} isEditMode />

          <Controls data={{ ...EMPTY_ASSIGNMENT, creator: userId }} />
        </WrapperStyled>
      </FormProvider>
    </Layout>
  );
};

export default NewAssignment;
