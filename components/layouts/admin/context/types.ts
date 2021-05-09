import { Dispatch, PropsWithChildren } from "react";
import { DeepMap } from "react-hook-form";
import { UIContextReducerAction } from "./actions/types";


export enum SidebarState{
    Minimized = "0",    
    Maximized = "1",
}

export enum ColorMode{
  Light="light", 
  Dark = "dark"
}

export type LayoutDirection = "rtl" | "ltr";

export interface UIContextModel extends DeepMap<any,any> {
    sidebarState : SidebarState,
    colorMode : ColorMode,
    dir : LayoutDirection
}

export type UIContextProviderProps = PropsWithChildren<{

}>

export interface UIContextReducer {
  (state: UIContextModel, action: UIContextReducerAction): UIContextModel;
}

export interface UIContextProviderValue {
  model: UIContextModel;
  dispatch: Dispatch<UIContextReducerAction>;
}
