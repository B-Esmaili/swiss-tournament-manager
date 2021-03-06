import { Box, Button } from "grommet";
import { TopBarProps } from "./types";
import { Menu } from "grommet-icons";
import { useUIContext } from "../../context";
import { SidebarState } from "../../context/types";

const TopBar: React.FC<TopBarProps> = () => {
  let uiContext = useUIContext() ?? { model: {} };

  const handleToggleSidebar = () => {
    uiContext.dispatch!({
      type: "ChangeSidebarState",
      payload:
        uiContext.model.sidebarState === SidebarState.Minimized
          ? SidebarState.Maximized
          : SidebarState.Minimized,
    });
  };

  return (
    <Box direction="row" align="center" flex="grow">
      <Box
        direction="row"
        fill
        pad={{
          horizontal: "1em",
        }}
      >
        <Button
          focusIndicator={false}
          icon={<Menu />}
          onClick={handleToggleSidebar}
        />
        {/* <Notifications/> */}
        {/* <Box direction="row-reverse" flex="grow" align="center">
          <Button focusIndicator={false} icon={<Apps />} />
          <LangPicker />
          <DirectionPicker />
          <UserArea/>
        </Box> */}
      </Box>
    </Box>
  );
};

export default TopBar;
