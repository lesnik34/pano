import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { FormProvider, useForm } from 'react-hook-form';
import Layout from '@components/global/layout';
import Error from '@components/error';
import AssignmentComponent from '@components/assignment';
import { useGetAssignmentQuery } from '@api/query/assignments';
import { PAGE_ASSIGNMENTS } from '@constants/pages';

import { ErrorWrapperStyled, WrapperStyled } from './assignment.styled';
import Controls from './controls';

interface AssignmentI {}

const Assignment: React.FC<AssignmentI> = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const formMethods = useForm();
  const navigate = useNavigate();
  const [isEditMode, setEditMode] = useState(false);
  const { data, isFetching, isError, refetch } = useGetAssignmentQuery({ assignmentId: id });

  const isErrorVisible = isError;
  const isAssignmentVisible = !isError;

  const onBackClick = useCallback(() => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(PAGE_ASSIGNMENTS, { replace: true });
    }
  }, [navigate]);

  const errorHandler = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Layout navHidden>
      <FormProvider {...formMethods}>
        <Button onPress={onBackClick} startContent={<IoIosArrowBack />} variant="light">
          {t('text.back')}
        </Button>

        {isAssignmentVisible && (
          <WrapperStyled>
            <AssignmentComponent
              title={t('edit.assignments.headline')}
              isEditMode={isEditMode}
              isLoading={isFetching}
              data={data}
            />

            {!isFetching && <Controls data={data} isEditMode={isEditMode} setEditMode={setEditMode} />}
          </WrapperStyled>
        )}

        {isErrorVisible && (
          <ErrorWrapperStyled>
            <Error onClick={errorHandler} />
          </ErrorWrapperStyled>
        )}
      </FormProvider>
    </Layout>
  );
};

export default Assignment;
