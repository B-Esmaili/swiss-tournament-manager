import { UIContextModel } from "./../types";
import { ChangeLayoutDir, ChangeSideBarState } from "./impl";
import { UIContextReducerAction } from "./types";
 
const actionMap: Record<
  string,
  (state: UIContextModel, payload: any) => UIContextModel
> = {
  ["ChangeSidebarState"]: ChangeSideBarState,
  ["ChangeLayoutDir"]: ChangeLayoutDir
};

const InvokeAction = ((
  actions: Record<
    string,
    (state: UIContextModel, payload: any) => UIContextModel
  >
) => (state: UIContextModel, action: UIContextReducerAction) => {
  if (actions.hasOwnProperty(action.type)) {
    return actions[action.type](state, action.payload);
  }
  return state;
})(actionMap);

export default InvokeAction;
