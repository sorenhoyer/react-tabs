/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useContext } from 'react';
import { isValidIndex } from './types';
import TabContext from './TabContext';
import { TabsContext } from './TabsContext';

export interface TabProps<T> {
  children: ((props: { isActive: boolean }) => React.ReactNode) | JSX.Element;
  className?: string;
  index: string;
  data?: T;
}

/* Indicates the element serves as a tab control.
When focused, is automatically activated, causing its associated tabpanel to be displayed.
Provides a title for its associated tabpanel. */
const Tab = <T extends unknown>({ children, className, index }: TabProps<T>): React.ReactElement<TabProps<T>> => {
  // const [activeIndex, setActiveIndex] = useRecoilState(activeIndexAtom);
  const {
    state: { activeIndex },
    dispatch,
  } = useContext(TabsContext);

  return (
    <TabContext.Provider value={{ index }}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        key={index}
        onClick={(): void => {
          dispatch({ type: 'SET_ACTIVE_INDEX', payload: index });
        }}
        className={className}
        css={css`
          cursor: pointer;
          background: white;
        `}
      >
        {typeof children === 'function' ? children({ isActive: index === activeIndex }) : children}
      </div>
    </TabContext.Provider>
  );
};

Tab.propTypes = {
  // eslint-disable-next-line react/require-default-props
  index: (props: any, propName: any, componentName: any) => {
    let error;

    const prop = props[propName];

    if (!isValidIndex(prop.index)) {
      error = new Error(
        `\`${componentName}\` only accepts index of type \`string\` and must not be parseable to an integer.`,
      );
    }

    return error;
  },
};

export default Tab;
