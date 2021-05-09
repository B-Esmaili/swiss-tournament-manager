import { Avatar, Box,  Menu, ThemeContext } from "grommet";
import React, { useContext } from "react";
import { UserAreaProps } from "./types";
import {
  Gremlin,
  UserSettings,
  Power,
  Key,
  Configure,
  UserExpert,
} from "grommet-icons";
import { useAppContext } from "context/app-context";

const UserArea: React.FC<UserAreaProps> = () => {
  let {
    model: { userInfo },
  } = useAppContext();

  let theme: any = useContext(ThemeContext) || {};

  let dropProps: any = { align: { top: "bottom" }, elevation: "medium" };

  if (theme.dir === "rtl") dropProps.align.right = "right";
  else dropProps.align.left = "left";

  return (
    <Box direction="row-reverse" fill="vertical">
      <Menu
        dropBackground="light"
        focusIndicator={false}
        dropProps={dropProps}
        icon={false}
        label={
          <Box
            margin={{
              end: "1em",
            }}
            background="light-1"
            pad="small"
            round="full"
            alignSelf="center"
          >
            {!userInfo?.avatar && <Gremlin />}
            {userInfo?.avatar && <Avatar src={userInfo?.avatar} />}
          </Box>
        }
        items={[
          { label: "Profile", icon: <UserSettings />, gap: "small" },
          { label: "Change Password", icon: <Key />, gap: "small" },
          { label: "Preferences", icon: <Configure />, gap: "small" },
          { label: "Activate Account", icon: <UserExpert />, gap: "small" },
          { label: "Logout", icon: <Power />, gap: "small" },
        ]}
      />
    </Box>
  );
};

export default UserArea;
