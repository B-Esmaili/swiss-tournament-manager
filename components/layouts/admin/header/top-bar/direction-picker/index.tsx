import { useUIContext } from "components/layouts/admin/context";
import { Box, Button, Menu } from "grommet";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  & * {
    padding: 0px;
  }
`;

const DirectionPicker: React.FC = () => {
  let items = [
    { name: "ltr", displayName: "LTR" },
    { name: "rtl", displayName: "RTL" },
  ];

  let {
    model: { dir },
    dispatch,
  } = useUIContext();

  return (
    <Box
      margin={{
        horizontal: "0.5em",
      }}
      pad={{
        vertical: "xxsmall",
        horizontal: "0.5em",
      }}
      focusIndicator={false}
      round="xxsmall"
      background="light"
    >
      <Button
        onClick={() =>
          dispatch!({
            type: "ChangeLayoutDir",
            payload: dir === "rtl" ? "ltr" : "rtl",
          })
        }
        focusIndicator={false}
      >
        { dir === "rtl" ? "LTR" : "RTL"}
      </Button>
    </Box>
  );
};

export default DirectionPicker;
