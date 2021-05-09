import React, { Dispatch, PropsWithChildren } from "react";
import { DeepMap } from "react-hook-form";
import { AppContextReducerAction } from "./actions/types";

export interface UserInfo {
  token?: string;
  id?: string;
  userName?: string;
  email?: string;
  avatar?:string
}

export enum NotificationStatus{
  Info = "Info",
  Warning = "Warning",
  Error = "Error",
  Success = "Success"
}

export interface NotificationItem{
  id : string | number,  
  link? : string,
  icon? : React.ReactNode,
  status? : NotificationStatus,
  label : string | React.ReactNode,
  onClick? : (item : NotificationItem)=>void
}

export interface SiteMapItem{
  label : JSX.Element | string,
  icon? : JSX.Element,
  isActive? : boolean,
  link? : string
}

export interface LanguageIdentifier{
  name : string,
  displayName : string
}

export interface AppContextModel extends DeepMap<any,any> {
  userInfo?: UserInfo;
  notifications : NotificationItem[],
  siteMap : (SiteMapItem | string)[],
  currentPage? : string | SiteMapItem,
  currentLang: LanguageIdentifier,
  languageList : LanguageIdentifier []
}

export type AppContextProviderProps = PropsWithChildren<{

}>

export interface AppContextReducer {
  (state: AppContextModel, action: AppContextReducerAction): AppContextModel;
}

export interface AppContextProviderValue {
  model: AppContextModel;
  dispatch: Dispatch<AppContextReducerAction>;
}


