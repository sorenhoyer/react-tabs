import { RefObject, useEffect } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];

type HandledEventsType = HandledEvents[number];

export type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];

export type Handler = (event: PossibleEvent) => void;

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: Handler): void => {
  useEffect(() => {
    const listener = (event: PossibleEvent): void => {
      if (!ref?.current || ref?.current?.contains?.(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export { useOnClickOutside };
