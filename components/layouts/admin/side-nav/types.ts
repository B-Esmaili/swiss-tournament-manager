import { PropsWithChildren } from "react";

export type SideNavItemInfo = PropsWithChildren<{
    label: JSX.Element | string,
    icon : JSX.Element ,
    link?:string,
    expanded?:boolean,
    items? : SideNavItemInfo []
}>

export interface SideNavProps{
    items : SideNavItemInfo []
}