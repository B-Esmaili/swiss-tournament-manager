import { ThemeContext } from "grommet";
import { useContext, useMemo } from "react";
import getCustomTheme from "./";

const useCustomTheme = (deps: any[]) => {
  let theme = useContext(ThemeContext);
  let customTheme = useMemo(() => {
    let themeObj = getCustomTheme(theme);
    return themeObj;
  }, deps);

  return customTheme;
};

export default useCustomTheme;
