import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { PAGE_TASKS } from '@constants/pages';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDeleteTaskMutation } from '@api/query/tasks';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";

import { WrapperStyled } from './delete.styled';

interface DeleteI {
  id?: string;
  isDisabled: boolean;
}

const Delete: React.FC<DeleteI> = ({ isDisabled, id }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const onDeleteClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const onDelete = useCallback(async () => {
    const { data } = await deleteTask({ id: id || '' });
    if (data) {
      navigate(PAGE_TASKS);
      toast.success(t('delete.task.success'));

      return;
    }

    toast.error(t('default.error.page.description'));
  }, [deleteTask, id, navigate, t]);

  return (
    <WrapperStyled>
      <Button
        onPress={onDeleteClick}
        className="mb-2.5"
        isDisabled={isDisabled}
        color="danger"
        variant="light"
        fullWidth
        size="lg"
      >
        {t('delete.text')}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t('delete.task.modal.title')}</ModalHeader>

              <ModalBody>{t('delete.task.modal.description')}</ModalBody>

              <ModalFooter>
                <Button isDisabled={isLoading} variant="light" onPress={onClose}>
                  {t('cancel.text')}
                </Button>

                <Button isLoading={isLoading} color="danger" onPress={onDelete}>
                  {t('delete.task.modal.button.delete')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </WrapperStyled>
  );
};

export default Delete;
