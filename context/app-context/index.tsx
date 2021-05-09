import { createContext, Reducer, useContext, useReducer } from "react";
import { AppContextModel, AppContextProviderProps, AppContextProviderValue } from "./types";
import Defaults from "./defaults";
import { AppContextReducerAction } from "./actions/types";
import InvokeAction from "./actions"; 

let AppContext = createContext<AppContextProviderValue>({
  model : Defaults,
  dispatch : ()=>null
});

export const AppContextProvider: React.FC<AppContextProviderProps> = (
  props
) => {
  let { children } = props;

  const initializer = (state: AppContextModel): AppContextModel => {
    return state;
  };

  let [state, dispatch] = useReducer<
    Reducer<AppContextModel, AppContextReducerAction>,
    AppContextModel
  >(
    (state: AppContextModel, action: AppContextReducerAction) => {
      return InvokeAction(state, action);
    },
    Defaults,
    initializer
  );

  let providerProps: AppContextProviderValue = {
    dispatch,
    model: state,
  };

  return <AppContext.Provider children={children} value={providerProps} />;
};

export const useAppContext = () => useContext(AppContext);
