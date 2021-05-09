import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Drop,
  DropProps,
  Grommet,
  Heading,
  ThemeContext,
  Text,
  Stack,
} from "grommet";
import { SideNavItemInfo, SideNavProps } from "./types";
import { FormNext, FormPrevious } from "grommet-icons";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { deepMerge } from "grommet/utils";
import Link from "next/link";
import { useUIContext } from "../context";
import { SidebarState } from "../context/types";
import { CustomThemeType } from "../theme";

const SubmMenuItemsWrap = styled.div`
  overflow: auto;
  & a {
    text-decoration: none;
  }
`;

const StyledSideNav = styled(Box)`
  & * {
    outline: none;
  }

  & a {
    text-decoration: none;
  }
`;

const StyledAccordionPanel = styled(AccordionPanel)`
  background-color: ${(props) => props.theme.global?.colors?.["light"]};
  &:hover {
    background-color: ${(props) => props.theme.global?.colors?.["light-2"]};
  }

  transition: background-color 0.3s ease;
`;

const None = styled.div``;

const SideNavItem = (props: SideNavItemInfo) => {
  let { items, icon, label, link } = props;
  const [hovering, setHovering] = useState(false);
  const hasChild = items && items.length > 0;
  let {
    model: { sidebarState },
  } = useUIContext();

  var theme = useContext(ThemeContext) as any;

  let dropProps: DropProps = {
    round: false,
  };

  if (theme.dir === "rtl") {
    dropProps.align = {
      right: "left",
    };
  } else {
    dropProps.align = {
      left: "right",
    };
  }

  let itemRef = useRef<HTMLDivElement | null>(null);

  const extendObj = hasChild
    ? {}
    : {
        accordion: {
          border: false,
          icons: {
            collapse: None,
            expand: None,
          },
        },
      };

  const renderPanelTitle = () => (
    <>
      {sidebarState === SidebarState.Minimized && itemRef.current && hovering && (
        <Drop {...dropProps} target={itemRef?.current!} plain>
          <Box
            pad="small"
            round="xsmall"
            background="dark-3"
            margin={{
              start: "2em",
            }}
          >
            <Text>{label}</Text>
          </Box>
        </Drop>
      )}
      <Box
        ref={itemRef}
        direction="row"
        align="center"
        gap="small"
        hoverIndicator={false}
        focusIndicator={false}
        pad={{
          horizontal:
            sidebarState === SidebarState.Maximized ? "small" : "none",
        }}
      >
        <Link href={link || "/"} passHref>
          <Box as="a" direction="row" fill="horizontal" focusIndicator={false}>
            <Box pad="medium" focusIndicator={false}>
              <Button plain icon={icon} />
            </Box>
            {sidebarState === SidebarState.Maximized && (
              <Heading
                level={4}
                color={hovering ? "dark-1" : "dark-3"}
                truncate
              >
                {label}
              </Heading>
            )}
          </Box>
        </Link>
      </Box>
    </>
  );

  const customTheme = deepMerge(theme, extendObj);

  return (
    <Grommet theme={customTheme}>
      <StyledAccordionPanel
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        label={renderPanelTitle()}
      >
        {items && items.length && (
          <>
            {items.map((item, i) => (
              <SideNavSubItem
                key={i}
                label={item.label}
                icon={item.icon}
                items={item.items}
              />
            ))}
          </>
        )}
      </StyledAccordionPanel>
    </Grommet>
  );
};

const SideNavSubItem: React.FC<SideNavItemInfo> = (props) => {
  let { items, icon, label, link } = props;
  let menuItemRef = useRef<HTMLDivElement>(null);
  let theme: any = useContext(ThemeContext) || {};
  let [hover, setHover] = useState<boolean>(false);

  let align: any = { top: "top" };

  if (theme.dir === "ltr") {
    align["left"] = "right";
  } else {
    align["right"] = "left";
  }

  let {
    model: { sidebarState },
  } = useUIContext(); 

  let subMenuIcon: JSX.Element = theme.dir === "ltr" ? <FormNext /> : <FormPrevious />;

  let isMin = sidebarState === SidebarState.Minimized;

  let dynamicProps: any = {
    as: isMin ? Stack : Box,
    anchor: theme.dir ==="ltr" ? "right" : "left",
    pad : isMin ? "none" : "medium"
  };

  return (
    <Link href={link ?? "/"}>
      <a>
        {isMin && !items?.length && menuItemRef.current && hover && (
          <Drop align={align} target={menuItemRef?.current!} plain>
            <Box
              pad="small"
              round="xsmall"
              background="dark-3"
              margin={{
                start: "2em",
              }}
            >
              <Text>{label}</Text>
            </Box>
          </Drop>
        )}
        <Box
          fill
          background="light-1"
          justify="center"
          ref={menuItemRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Box direction="row" justify="center" align="center">
            <Box {...dynamicProps} direction="row" justify="start" fill>
              <Box flex="grow">
                <Button
                  gap="medium"
                  alignSelf="start"
                  plain
                  color={"dark-1"}
                  icon={<Box pad={!isMin ? "none" : "medium"}>{icon}</Box>}
                  label={!isMin ? label : ""}
                />
              </Box>
              {items && items.length > 0 && (
                <Button
                  plain
                  style={{
                    padding: isMin ? "0.5em 0" : "0"
                  }}
                  focusIndicator={false}
                  icon={subMenuIcon}
                  margin={{
                    start: "xxsmall",
                  }}
                />
              )}
            </Box>
          </Box>
          {items && hover && (
            <Drop target={menuItemRef!.current!} align={align} stretch>
              <SubmMenuItemsWrap>
                {items.map((item, i) => (
                  <SideNavSubItem key={i} {...item} />
                ))}
              </SubmMenuItemsWrap>
            </Drop>
          )}
        </Box>
      </a>
    </Link>
  );
};

const SideNav: React.FC<SideNavProps> = (props) => {
  let { items } = props;

  let {
    model: { sidebarState },
  } = useUIContext();

  let theme: CustomThemeType = useContext(ThemeContext) as CustomThemeType;

  let width =
    sidebarState === SidebarState.Maximized
      ? theme.global.layout.sidebarWidth
      : theme.global.layout.sidebarMinWidth;

  return (
    <StyledSideNav style={{ padding: "0px" }}>
      <Accordion multiple pad="none" width={width}>
        {items.map((item, i) => (
          <SideNavItem key={i} {...item} />
        ))}
      </Accordion>
    </StyledSideNav>
  );
};

export default SideNav;
