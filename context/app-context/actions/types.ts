import { LanguageIdentifier, NotificationItem, SiteMapItem, UserInfo } from "../types";

export type AppContextReducerAction =
  | {
      type: "SetUserInfo";
      payload: Partial<UserInfo>;
    }
  | {
      type: "AddNotification";
      payload: NotificationItem;
    }
  | {
      type: "SetCurrentPage";
      payload: SiteMapItem | string;
    }
  | {
      type: "SetSiteMap";
      payload: (SiteMapItem | string)[];
    }
  | {
      type: "SetCurrentLang";
      payload: LanguageIdentifier;
    };
