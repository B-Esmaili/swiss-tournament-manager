import SideNav from "./side-nav";
import SideNavLoader from "./side-nav/nav-preloader";
import Header from "./header";
import { useContext, useEffect, useState } from "react";
import { SideNavItemInfo } from "./side-nav/types";
import { AdminLayoutProps } from "./types";
import { Box, Header as HeaderAre, Sidebar, Grid, ThemeContext } from "grommet";
import { Trophy, Group, Dashboard, CircleInformation } from "grommet-icons";
import { useUIContext } from "./context";
import { SidebarState } from "./context/types";
import { CustomThemeType } from "./theme";
import Breadcrumb from "./breadcrumb";
import styled from "styled-components";
import { DataTableContextProvider } from "gromet-hook-form";

const AnimatedSidebar = styled(Sidebar)`
  transition: width 0.3s ease;
`;

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  let { children } = props;

  const menuItems: SideNavItemInfo[] = [
    {
      label: "Dashboard",
      icon: <Dashboard />,
      link: "/",
    },
    {
      label: "Tournaments",
      icon: <Trophy />,
      link: "/tournaments",
    },
    {
      label: "Players",
      icon: <Group />,
      link: "/players",
    },
    {
      label: "About",
      icon: <CircleInformation />,
      link: "/about",
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
      fill="horizontal"
      rows={["5rem", "auto"]}
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
        <Box pad={{ horizontal: "small", bottom: "small" }}>
          <Box background="light" round="xsmall">
            {children}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default AdminLayout;
