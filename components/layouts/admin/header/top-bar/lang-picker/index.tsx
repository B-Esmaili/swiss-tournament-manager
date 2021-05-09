import { useAppContext } from "context/app-context";
import { LanguageIdentifier } from "context/app-context/types";
import { Box, Menu } from "grommet";
import React from "react";
import styled from "styled-components";
import { LangPickerProps } from "./types";
import setLanguage from 'next-translate/setLanguage'

const StyledMenu = styled(Menu)`
  & * {
    padding: 0px;
  }
`;

const LangPicker: React.FC<LangPickerProps> = () => {
  let {
    model: { currentLang, languageList },dispatch
  } = useAppContext();

  return (
    <Box
      focusIndicator={false}
      margin={{
        horizontal: "0.5em",
      }}
      pad={{
        vertical: "xxsmall",
        horizontal: "0.5em",
      }}
      round="xxsmall"
      background="light"
    >
      <StyledMenu        
        label={currentLang.displayName}
        plain        
        focusIndicator={false}
        icon={false}
        size="medium"
        items={languageList.filter(l=>l.name !== currentLang.name).map((l:LanguageIdentifier)=>({
            label :l.displayName , name : l.name , onClick:()=>{
              dispatch({type:"SetCurrentLang" ,payload : l});
              setLanguage(l.name);
            }
        }))}
      ></StyledMenu>
    </Box>
  );
};

export default LangPicker;
