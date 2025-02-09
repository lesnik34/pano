import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { PAGE_ASSIGNMENTS } from '@constants/pages';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { useDeleteAssignmentMutation } from '@api/query/assignments';

import { WrapperStyled } from './delete.styled';

interface DeleteI {
  id?: string;
  isDisabled: boolean;
}

const Delete: React.FC<DeleteI> = ({ isDisabled, id }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();

  const [deleteAssignment, { isLoading }] = useDeleteAssignmentMutation();

  const onDeleteClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const onDelete = useCallback(async () => {
    const { data } = await deleteAssignment({ id: id || '' });
    if (data) {
      navigate(PAGE_ASSIGNMENTS);
      toast.success(t('delete.assignment.success'));

      return;
    }

    toast.error(t('default.error.page.description'));
  }, [deleteAssignment, id, navigate, t]);

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
              <ModalHeader className="flex flex-col gap-1">{t('delete.assignment.modal.title')}</ModalHeader>

              <ModalBody>{t('delete.assignment.modal.description')}</ModalBody>

              <ModalFooter>
                <Button isDisabled={isLoading} variant="light" onPress={onClose}>
                  {t('cancel.text')}
                </Button>

                <Button isLoading={isLoading} color="danger" onPress={onDelete}>
                  {t('delete.assignment.modal.button.delete')}
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
