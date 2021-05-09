import { BoxProps } from "grommet";
import { ThemeType } from "grommet/themes";
import { ColorType, deepMerge } from "grommet/utils";
import { DeepPartial } from "react-hook-form";
import { PropType } from "types/utils";

export type CustomThemeType = DeepPartial<ThemeType> & {
  global: {
    colors: {
      light: ColorType;
      brand2: ColorType;
      brand3: ColorType;
      brand4: ColorType;
      brandText: ColorType;
      brand2Text: ColorType;
      brand3Text: ColorType;
      brand4Text: ColorType;
    };
    layout:{
        sidebarWidth : PropType<BoxProps, 'width'>,
        sidebarMinWidth : PropType<BoxProps, 'width'>
    }
  };
}


const themeVars: CustomThemeType = {
  global: {    
    colors: {    
      light: "#fff",
      brand: { dark: "#962798", light: "#962798" },
      brand2: { dark: "#a93aa9", light: "#a93aa9" },
      brand3: { dark: "#d676d5", light: "#d676d5" },      
      brand4: { dark: "#d7fbe8", light: "#d7fbe8" },      
      brandText: { dark: "#f1f1f1", light: "#f1f1f1" },
      brand2Text: { dark: "#f1f1f1", light: "#f1f1f1" },
      brand3Text: { dark: "#f1f1f1", light: "#f1f1f1" },      
      brand4Text: { dark: "#f1f1f1", light: "#f1f1f1" },      
      background: {
        dark: "#222",
        light: "#efefef",
      },
    },
    layout:{
        sidebarWidth : "15em",
        sidebarMinWidth : "4em"
    }    
  },
};

const getCustomTheme = (baseTheme: ThemeType) =>
  deepMerge(baseTheme, themeVars);

export default getCustomTheme;
