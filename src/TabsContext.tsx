import React from 'react';

const initialState = { activeIndex: '' };

export type State = typeof initialState;

export type SetActiveIndexAction = {
  type: 'SET_ACTIVE_INDEX';
  payload: string;
};

export type Action = SetActiveIndexAction;

const reducer: React.Reducer<State, Action> = (state, action: Action): State => {
  switch (action.type) {
    case 'SET_ACTIVE_INDEX':
      return {
        ...state,
        activeIndex: action.payload,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, no-shadow
export const createCtx = <TState, TAction>(reducer: React.Reducer<TState, TAction>, initialState: TState) => {
  const defaultDispatch: React.Dispatch<TAction> = () => initialState; // we never actually use this

  const ctx = React.createContext({
    state: initialState,
    dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
  });

  // eslint-disable-next-line @typescript-eslint/ban-types
  const Provider = (props: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = React.useReducer<React.Reducer<TState, TAction>>(reducer, initialState);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  };

  return [ctx, Provider] as const;
};

const [ctx, TabsProvider] = createCtx(reducer, initialState);

export const TabsContext = ctx;

export default TabsProvider;
