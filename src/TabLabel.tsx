/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useContext } from 'react';
import TabContext from './TabContext';
import { TabsContext } from './TabsContext';

export const tabLabelCSS = (isActive: boolean) => css`
  padding: 1.25rem 1.5rem;

  ${isActive && `background: #e6e6e6;`}

  :hover {
    background: #e6e6e6;
  }
`;

const TabLabel = ({ className, children }: any) => {
  const {
    state: { activeIndex },
  } = useContext(TabsContext);
  const ctx = useContext(TabContext);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className={className} css={tabLabelCSS(ctx.index === activeIndex)}>
      <div>{children}</div>
    </div>
  );
};

export default TabLabel;
