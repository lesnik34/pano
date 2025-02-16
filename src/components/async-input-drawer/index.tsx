import React, { useEffect, useRef, useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, Input, ScrollShadow, Spinner } from '@heroui/react';

import { DEBOUNCE_TIME } from '@constants/common';
import useWindowSize from '@hooks/widow-size';
import theme from '@styles/theme';

import { DepartmentListStyled, DepartmentWrapperStyled, DrawerWrapperStyled } from './input.styled';

interface AsyncInputDrawerI {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  inputPlaceholder: string;
  isLoading: boolean;
  setSearch: (value: string) => void;
  searchedItems?: {
    title: string;
    id: string;
    [key: string]: any;
  }[];
  onItemClick: (value: { title: string; id: string; [key: string]: any }) => () => void;
}

const AsyncInputDrawer: React.FC<AsyncInputDrawerI> = ({
  inputPlaceholder,
  isOpen,
  onOpenChange,
  title,
  isLoading,
  searchedItems,
  onItemClick,
  setSearch,
}) => {
  const { device } = useWindowSize(theme);
  const [inputValue, setInputValue] = useState('');
  const [isWaiting, setWaiting] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>();
  const loading = isLoading || isWaiting;

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setWaiting(true);
    timeoutRef.current = setTimeout(() => {
      setWaiting(false);
      setSearch(inputValue);
    }, DEBOUNCE_TIME);
  }, [inputValue, setSearch]);

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={device.isDesktopWidth || device.isTabletWidth ? 'right' : 'bottom'}
    >
      <DrawerContent>
        {() => (
          <DrawerWrapperStyled>
            <DrawerHeader>{title}</DrawerHeader>

            <DrawerBody>
              <Input
                size="lg"
                placeholder={inputPlaceholder}
                onValueChange={setInputValue}
                autoComplete="off"
                spellCheck={false}
              />

              {loading ? (
                <Spinner className="mt-8" />
              ) : (
                <ScrollShadow className="w-full h-full max-h-[30vh] mt-6">
                  <DepartmentListStyled>
                    {searchedItems?.map((element) => (
                      <DepartmentWrapperStyled>
                        <Button key={element.id} fullWidth variant="flat" onPress={onItemClick(element)}>
                          {element.title}
                        </Button>
                      </DepartmentWrapperStyled>
                    ))}
                  </DepartmentListStyled>
                </ScrollShadow>
              )}
            </DrawerBody>
          </DrawerWrapperStyled>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AsyncInputDrawer;
