import { AppContextModel } from "../types";
import { Map } from "immutable";

export const updateInPath = function <TProp, TValue>(
  state: AppContextModel,
  path: string[],
  value: TValue,
  updateFunc: (prop: TProp, value: TValue) => TProp
): AppContextModel {
  let ps = Map(state);
  let new_state = ps.updateIn(path, (prop: TProp) =>
    updateFunc(prop, value)
  );
  return new_state.toObject() as AppContextModel;
};
