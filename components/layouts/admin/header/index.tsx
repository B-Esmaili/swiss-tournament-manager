import { Box } from "grommet";
import React from "react";
import Branding from "./branding";
import TopBar from "./top-bar";
import { HeaderProps } from "./types";

const Header: React.FC<HeaderProps> = () => {

  return (
    <Box background="brand2"
    direction="row" 
    fill>
        <Branding/>
        <TopBar/>
    </Box>
  );
};

export default Header;
