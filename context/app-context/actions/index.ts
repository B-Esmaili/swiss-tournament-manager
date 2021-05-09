import { AppContextModel } from "./../types";
import { AddNotification, SetCurrentLang, SetCurrentPage, SetSiteMap, SetUserInfo } from "./impl";
import { AppContextReducerAction } from "./types";

const actionMap: Record<
  string,
  (state: AppContextModel, payload: any) => AppContextModel
> = {
  ["SetUserInfo"]: SetUserInfo,
  ["AddNotification"]:AddNotification,
  ["SetCurrentPage"]:SetCurrentPage,
  ["SetSiteMap"]:SetSiteMap,
  ["SetCurrentLang"] : SetCurrentLang
};

const InvokeAction = ((
  actions: Record<
    string,
    (state: AppContextModel, payload: any) => AppContextModel
  >
) => (state: AppContextModel, action: AppContextReducerAction) => {
  if (actions.hasOwnProperty(action.type)) {
    return actions[action.type](state, action.payload);
  }
  return state;
})(actionMap);

export default InvokeAction;
