import { LayoutDirection, SidebarState, UIContextModel } from "../types";

export const ChangeSideBarState = (
  state: UIContextModel,
  payload: SidebarState
) => {
  return {
    ...state,
    sidebarState: payload,
  };
};

export const ChangeLayoutDir = (
  state: UIContextModel,
  dir: LayoutDirection
) => {
  return {
    ...state,
    dir
  };
};
