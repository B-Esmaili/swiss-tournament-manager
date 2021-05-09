import { LayoutDirection, SidebarState } from '../types';

export type UIContextReducerAction = 
|{
    type : "ChangeSidebarState",
    payload : SidebarState
}
|{
    type : "ChangeLayoutDir",
    payload : LayoutDirection
}