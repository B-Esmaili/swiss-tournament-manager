import { Anchor, Box, Nav, Text } from "grommet";
import React, { Fragment } from "react";
import { BreadcrumbProps } from "./types";
import { Home } from "grommet-icons";
import { useAppContext } from "context/app-context";
import { SiteMapItem } from "context/app-context/types";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

const Breadcrumb: React.FC<BreadcrumbProps> = () => {
  let { t: T } = useTranslation("theme");
  let {
    model: { siteMap },
  } = useAppContext();

  if (!siteMap) {
    siteMap = [];
  }
  
  if (
    !siteMap.length ||
    !siteMap.some(
      (m: any) => typeof m !== "string" && (m as SiteMapItem).link === "/"
    )
  ) {
    let homeItem: SiteMapItem = {
      link: "/",
      label: T("breadcrumb-home"),
      icon: <Home />,
    };

    siteMap.unshift(homeItem as any);
  }

  return (
    <Box
      pad={{
        horizontal: "medium",
        vertical: "xsmall",
      }}
      direction="row"
      align="center"
      flex="grow"
    >
      <Nav direction="row" align="center">
        {siteMap.map((item: string | SiteMapItem, i: number) => {
          return (
            <Fragment key={i}>
              {i > 0 && <Text>/</Text>}
              <Link href={typeof(item) === "string" ? "#" : item.link ?? "#"} >
                <Anchor                  
                  href=""
                  icon={typeof item === "string" ? <></> : item.icon ?? <></>}
                  label={
                      <Text>
                          {typeof item === "string" ? item : item.label}
                      </Text>
                  }
                />
              </Link>
            </Fragment>
          );
        })}
      </Nav>
    </Box>
  );
};

export default Breadcrumb;
