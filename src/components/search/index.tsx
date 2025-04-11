import React, { useCallback, useRef, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';
import { FiSearch } from 'react-icons/fi';
import { ModalBodyWrapperStyled, ModalTitleStyled } from './search.styled';
import Items from './items';

interface SearchI {
  isLoading?: boolean;
  title?: string;
  placeholder?: string;
  children: (search: string) => React.ReactNode;
}

const Search: React.FC<SearchI> = ({ isLoading, title, placeholder, children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value);
  }, []);

  const onFocus = useCallback((event: React.FocusEvent) => {
    event.preventDefault();
  }, []);

  const onVisionChange = useCallback(
    (isModalOpen: boolean) => {
      if (!isModalOpen) {
        setSearch('');
      }

      onOpenChange();
    },
    [onOpenChange],
  );

  return (
    <div>
      <Button
        onPress={onOpen}
        isIconOnly
        isDisabled={isLoading}
        variant="flat"
        color="default"
        startContent={<FiSearch />}
      />

      <Modal
        ref={headerRef}
        placement="top"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onVisionChange}
        classNames={{
          base: 'mx-5 my-20',
          closeButton: 'z-50',
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex-col relative">
                <ModalTitleStyled>{title}</ModalTitleStyled>

                <Input
                  size="md"
                  onChange={onInputChange}
                  placeholder={placeholder}
                  startContent={<FiSearch />}
                  variant="underlined"
                  isClearable
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  onFocus={onFocus}
                />
              </ModalHeader>

              <ModalBody>
                <ModalBodyWrapperStyled>{children(search)}</ModalBodyWrapperStyled>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Search;
