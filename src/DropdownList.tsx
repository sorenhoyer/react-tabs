/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const DropdownList = ({ height: yPos, isOpen, children, setActiveIndex, unmountOnExit = false }: any) => {
  return !isOpen && unmountOnExit ? null : (
    <div
      css={css`
        position: absolute;
        left: 0;
        top: ${yPos}px;
        border: 0.0625rem solid #e6e6e6;
        background: white;
        ${!isOpen && !unmountOnExit ? 'content-visibility: hidden;' : ''}
      `}
    >
      <div>
        {children?.map((el: React.ReactElement, index: number) => {
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={(): void => {
                setActiveIndex((el as any)?.props?.index);
              }}
            >
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownList;
