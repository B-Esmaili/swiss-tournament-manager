import { Box, BoxProps, Text, ThemeContext } from "grommet";
import { normalizeColor } from "grommet/utils";
import { useContext } from "react";
import { useUIContext } from "../context";
import { SidebarState } from "../context/types";
import { CustomThemeType } from "../theme";
import { Grommet as GrommetIcon } from "grommet-icons";
import { PropType } from "types/utils";
import styled from "styled-components";

const AnimatedBox = styled(Box)`
  transition: width 0.3s ease;
`;

const Branding = () => {
  let theme: CustomThemeType = useContext(ThemeContext) as CustomThemeType;
  let {
    model: { sidebarState },
  } = useUIContext();

  let { sidebarWidth, sidebarMinWidth } = theme.global.layout;

  let sibeBarWidth =
    sidebarState === SidebarState.Maximized ? sidebarWidth : sidebarMinWidth;

  let pad = sidebarState === SidebarState.Maximized ? "2em" : "0.5em";
  let justify: PropType<BoxProps, "justify"> =
    sidebarState === SidebarState.Maximized ? "start" : "center";

  return (
    <AnimatedBox
      background="brand"
      width={sibeBarWidth}
      direction="row"
      fill="vertical"
      justify={justify}
      align="center"
      pad={pad}
    >
      <GrommetIcon
        color={
          theme.global.colors.brand2Text
            ? normalizeColor(theme.global.colors.brand2Text, theme)
            : theme.global.colors.brand2Text
        }
      />
      {sidebarState === SidebarState.Maximized && (
        <Text
          as="h1"
          color={theme.global.colors.brand2Text}
          margin={{ start: "1em" }}
          truncate
        >
          Tournament Manager
        </Text>
      )}
    </AnimatedBox>
  );
};

export default Branding;
