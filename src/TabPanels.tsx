/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useContext, useMemo } from 'react';
import { TabsContext } from './TabsContext';
import { TabPanelProps } from './TabPanel';

type TabPanelsProps = {
  children: React.ReactElement<TabPanelProps>[];
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const TabPanels = ({ children, className }: TabPanelsProps): React.ReactElement<TabPanelsProps> => {
  // const [activeIndex] = useRecoilState(activeIndexAtom);
  const {
    state: { activeIndex },
  } = useContext(TabsContext);

  const childrenArray = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);

  return (
    <div
      css={css`
        border: 0.0625rem solid #e6e6e6;
      `}
      className={className}
    >
      {childrenArray.find((child) => child.props.index === activeIndex)}
    </div>
  );
};

export default TabPanels;
