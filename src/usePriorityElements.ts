import React, { useState, useEffect } from 'react';

type UsePriorityElements = {
  hiddenElements: JSX.Element[];
  shownElements: JSX.Element[];
};

const getVisibleElementsCount = (
  innerRefChildrenWidth: number[],
  navRefWidth: number,
  minElementsAmount: number,
): number | undefined => {
  let totalWidth = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < innerRefChildrenWidth.length; i++) {
    if (totalWidth + innerRefChildrenWidth[i] + innerRefChildrenWidth[i + 1] > navRefWidth) {
      return i < minElementsAmount ? minElementsAmount : i;
    }

    totalWidth += innerRefChildrenWidth[i];
  }
};

const usePriorityElements = (
  outerRefWidth: number,
  innerRefChildren: HTMLCollection | undefined,
  elements: React.ReactElement[],
  minElementsAmount = 1,
): UsePriorityElements => {
  const elementsArray = elements;

  const [shownElements, setShownElements] = useState<JSX.Element[]>(elementsArray);

  const [hiddenElements, setHiddenElements] = useState<JSX.Element[]>([]);

  const [innerRefChildrenWidth, setInnerRefChildrenWidth] = useState<number[]>([]);

  useEffect(() => {
    if (innerRefChildren) {
      setInnerRefChildrenWidth(Array.from(innerRefChildren).map((elem) => (elem as HTMLElement).clientWidth));
    }
  }, [innerRefChildren]);

  useEffect(() => {
    if (outerRefWidth) {
      setShownElements(
        elementsArray.slice(0, getVisibleElementsCount(innerRefChildrenWidth, outerRefWidth, minElementsAmount)),
      );
    }
  }, [innerRefChildrenWidth, outerRefWidth, elementsArray, minElementsAmount]);

  useEffect(() => {
    setHiddenElements(elementsArray.slice(shownElements.length, elementsArray.length));
  }, [shownElements, elementsArray]);

  return {
    shownElements,
    hiddenElements,
  };
};

export default usePriorityElements;
