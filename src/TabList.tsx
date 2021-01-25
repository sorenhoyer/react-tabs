/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import useMeasure from 'react-use-measure';
import { TabProps } from './Tab';
import { TabsContext } from './TabsContext';
import usePriorityElements from './usePriorityElements';

type TabListProps<T> = {
  // eslint-disable-next-line react/require-default-props
  initialActiveIndex?: string;
  children: React.ReactElement<TabProps<T>>[];
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  renderDropdownTab?: (props: {
    tabs: React.ReactElement<TabProps<T>>[];
    setActiveIndex: (index: string) => void;
  }) => React.ReactNode;
};

/** Indicates that the element serves as a container for a set of tabs. */
const TabList = <T extends unknown>({
  children,
  initialActiveIndex,
  className,
  renderDropdownTab,
}: TabListProps<T>): React.ReactElement<TabListProps<T>> => {
  const { dispatch } = useContext(TabsContext);

  const childrenArray = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);

  useEffect(() => {
    if (initialActiveIndex) dispatch({ type: 'SET_ACTIVE_INDEX', payload: initialActiveIndex });
    else
      dispatch({
        type: 'SET_ACTIVE_INDEX',
        payload: childrenArray[0].props.index,
      });
  }, [childrenArray, initialActiveIndex, dispatch]);

  const [ref, bounds] = useMeasure({ debounce: 100 });

  const innerNavRef = useRef<HTMLDivElement>(null);

  const { hiddenElements, shownElements } = usePriorityElements(
    bounds.width,
    innerNavRef?.current?.children,
    childrenArray,
  );

  return (
    <div ref={ref}>
      <div
        className={className}
        ref={innerNavRef}
        css={css`
          display: flex;
          white-space: nowrap;
          border: 1px solid #e6e6e6;
          border-bottom: 0;
        `}
      >
        {shownElements?.map((tab) => tab)}

        {hiddenElements?.length && renderDropdownTab
          ? renderDropdownTab({
              tabs: hiddenElements,
              setActiveIndex: (index) => dispatch({ type: 'SET_ACTIVE_INDEX', payload: index }),
            })
          : undefined}
      </div>
    </div>
  );
};

// TabList.propTypes = {
//   children: (props: any, propName: any, componentName: any) => {
//     let error;

//     const prop = props[propName];

//     React.Children.forEach(prop, (child) => {
//       // type.name seems to work for both Class and Functional components
//       if (child.type.name !== "Tab") {
//         error = new Error(
//           `\`${componentName}\` only accepts children of type \`Tab\`.`
//         );
//       }
//     });

//     return error;
//   },
// };

export default TabList;
