import SideNav from "./side-nav";
import SideNavLoader from "./side-nav/nav-preloader";
import Header from "./header";
import { useContext, useEffect, useState } from "react";
import { SideNavItemInfo } from "./side-nav/types";
import { AdminLayoutProps } from "./types";
import {
  Box,
  Header as HeaderAre,  
  Sidebar,
  Grid,
  ThemeContext,
} from "grommet";
import {
  Configure,
  CircleInformation,
  Dashboard,
  Plan,
  Inbox,
  Local,
  Resources,
  ContactInfo,
  BarChart,
} from "grommet-icons";
import { useUIContext } from "./context";
import { SidebarState } from "./context/types";
import { CustomThemeType } from "./theme";
import Breadcrumb from "./breadcrumb";
import styled from "styled-components";

const AnimatedSidebar = styled(Sidebar)`
    transition: width 0.3s ease;
`;

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  let { children } = props;

  const menuItems: SideNavItemInfo[] = [
    {
      label: "Dashboard",
      icon: <Dashboard />,
    },
    {
      label: "Components",
      icon: <Resources />,
    },
    {
      link: "/forms",
      label: "Form",
      icon: <Local />,
      items:[{
        label: "Normal",
        icon: <Resources />,
      },{
        label: "Advanced",
        icon: <Resources />,
        items : [
          {
            label: "Wizard Form",
            icon: <Resources />,
          },
          {
            label: "HTTP Form",
            icon: <Resources />,
          }
        ]
      }]
    },
    {
      link: "/user",
      label: "User Profile",
      icon: <ContactInfo />,
    },
    {
      link: "/charts",
      label: "Charts",
      icon: <BarChart />,
    },
    {
      link: "/inbox",
      label: "Inbox",
      icon: <Inbox />,
    },
    {
      link: "/calendars",
      label: "Calendar",
      icon: <Plan />,
    },
    {
      link: "/settings",
      label: "Settings",
      icon: <Configure />,
    },
    {
      link: "/about",
      label: "About",
      icon: <CircleInformation />,
    },
  ];
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  let theme = useContext(ThemeContext) as CustomThemeType;

  let {
    model: { sidebarState },
  } = useUIContext();
  let sideBarWidth =
    sidebarState === SidebarState.Maximized
      ? theme.global.layout.sidebarWidth
      : theme.global.layout.sidebarMinWidth;

  return (
    <Grid
      fill
      rows={["5rem", "flex"]}
      columns={["auto", "flex"]}
      areas={[
        {
          name: "header",
          start: [0, 0],
          end: [1, 0],
        },
        {
          name: "main",

          start: [1, 1],
          end: [1, 1],
        },
        {
          name: "nav",
          start: [0, 1],
          end: [0, 1],
        },
      ]}
    >
      <Box gridArea="header" fill>
        <HeaderAre fill>{<Header />}</HeaderAre>
      </Box>
      <Box gridArea="nav">
        <AnimatedSidebar background="light" pad="none" width={sideBarWidth}>
          {loading && <SideNavLoader />}
          {!loading && <SideNav items={menuItems} />}
        </AnimatedSidebar>
      </Box>
      <Box gridArea="main">
        <Breadcrumb />
        <Box pad={{horizontal : "small" , bottom : "small"}}>
          <Box background="light"
             round="xsmall">{children}</Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default AdminLayout;
