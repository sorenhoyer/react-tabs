/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React from 'react';

const arrowStyles = (direction: 'top' | 'bottom'): SerializedStyles => css`
  padding-right: 0.5rem;

  :after {
    content:"";
    width: 0;
    height: 0;
    border-left: 0.25rem solid transparent;
    border-right: 0.25rem solid transparent;
    border-${direction}: 0.4rem solid #c0c2c3;
    display: inline-block;
    margin-left: 0.5rem;
  }
`;

const DropdownButtonLabel = ({ children, isOpen }: any) => {
  return <div css={isOpen ? arrowStyles('top') : arrowStyles('bottom')}>{children}</div>;
};

export default DropdownButtonLabel;
