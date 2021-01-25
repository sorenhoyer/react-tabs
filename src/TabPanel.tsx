/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

export type TabPanelProps = { children: React.ReactNode; className?: string; index: string };

/** Indicates the element serves as a container for tab panel content.
Is hidden unless its associated tab control is activated. */
const TabPanel = ({ children, className }: TabPanelProps): React.ReactElement<TabPanelProps> => {
  return (
    <div
      css={css`
        padding: 1rem;
      `}
      className={className}
    >
      {children}
    </div>
  );
};

export default TabPanel;
