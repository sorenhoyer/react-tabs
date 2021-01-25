/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useMemo, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import useMeasure from 'react-use-measure';
import { useOnClickOutside } from './hooks';

type DropdownButtonProps = {
  dropdown: (props: { isOpen: boolean; height: number; elements: React.ReactNode[] }) => React.ReactNode;
  label: (props: { isOpen: boolean }) => React.ReactNode;
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

const DropdownButton = ({
  children,
  className,
  label,
  dropdown,
}: DropdownButtonProps): React.ReactElement<DropdownButtonProps> => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = React.useRef(null);

  useOnClickOutside(ref, (): void => {
    setIsOpen(false);
  });

  const [funcRef, { height }] = useMeasure({ debounce: 100 });

  const childrenArray = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={mergeRefs([ref, funcRef])}
      className={className}
      onClick={(): void => {
        setIsOpen(!isOpen);
      }}
      css={css`
        position: relative;
        cursor: pointer;
        z-index: 2000;
        background: white;
      `}
    >
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        css={css`
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
        `}
      >
        {label({ isOpen })}
      </button>
      {dropdown({ isOpen, height, elements: childrenArray })}
    </div>
  );
};

export default DropdownButton;
