import { createContext, Reducer, useContext, useReducer } from "react";
import {
  ColorMode,
  SidebarState,
  UIContextModel,
  UIContextProviderProps,
  UIContextProviderValue,
} from "./types";
import { UIContextReducerAction } from "./actions/types";
import InvokeAction from "./actions";

const Defaults: UIContextModel = {
  sidebarState: SidebarState.Maximized,
  colorMode: ColorMode.Light,
  dir: "ltr",
};

export const UIContext = createContext<UIContextProviderValue>({
  model: Defaults,
  dispatch: () => {},
});

export const UIContextProvider: React.FC<UIContextProviderProps> = (props) => {
  let { children } = props;

  const initializer = (state: UIContextModel): UIContextModel => {
    return state;
  };

  let [state, dispatch] = useReducer<
    Reducer<UIContextModel, UIContextReducerAction>,
    UIContextModel
  >(
    (state: UIContextModel, action: UIContextReducerAction) => {
      return InvokeAction(state, action);
    },
    Defaults,
    initializer
  );

  let providerProps: UIContextProviderValue = {
    dispatch,
    model: state,
  };

  return <UIContext.Provider children={children} value={providerProps} />;
};

export const useUIContext = () => useContext(UIContext);
