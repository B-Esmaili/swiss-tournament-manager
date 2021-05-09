import { Grommet } from "grommet";
import { AdminLayoutProps } from "./types";
import AdminLayoutRoot from "./layout";
import useCustomTheme from "./theme/use-theme";
import { UIContextProvider, UIContext } from "./context";
import {  UIContextProviderValue } from "./context/types";

const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  const { children } = props;

  let customeTheme = useCustomTheme([]);

  return (
    <UIContextProvider>
      <UIContext.Consumer>
        {(value: UIContextProviderValue) => (
          <Grommet
            theme={customeTheme}
            themeMode={value.model.colorMode}
            full
            dir={value.model.dir as any}
          >
            <AdminLayoutRoot children={children} />
          </Grommet>
        )}
      </UIContext.Consumer>
    </UIContextProvider>
  );
};

export { AdminLayout as default };
