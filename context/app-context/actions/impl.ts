import { AppContextModel, LanguageIdentifier, SiteMapItem, UserInfo } from "../types";
import { NotificationItem } from "../types";

export const SetUserInfo = (state: AppContextModel, payload: UserInfo) => {
  return {
    ...state,
    userInfo: {
      ...state.userInfo,
      ...payload,
    },
  };
};

export const AddNotification = (
  state: AppContextModel,
  item: NotificationItem
) => {
  return {
    ...state,
    notifications: [...state.notifications, item],
  };
};


export const SetCurrentPage = (
  state: AppContextModel,
  page: SiteMapItem | string
) => {
  return {
    ...state,
    currentPage : page,
  };
};

export const SetSiteMap = (
  state: AppContextModel,
  map: (SiteMapItem | string)[]
) => {
  return {
    ...state,
    siteMap : map,
  };
};


export const SetCurrentLang = (
  state: AppContextModel,
  lang: LanguageIdentifier
) => {
  return {
    ...state,
    currentLang : lang,
  };
};
