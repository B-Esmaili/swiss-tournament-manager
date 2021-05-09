import { Box, Button, Menu, Stack, Text, ThemeContext } from "grommet";
import { NotificationsProps } from "./types";
import { Notification as NotificationIcon } from "grommet-icons";
import { useContext } from "react";
import {
  NotificationItem,
  NotificationStatus,
} from "context/app-context/types";
import { useAppContext } from "context/app-context";

const NotificationButton = (props: any) => {
  let { count } = props;
  return (
    <Button focusIndicator={false} {...props}>
      <Box direction="row" align="center">
        <NotificationIcon />
        {!!(count && count > 0) && (
          <Stack
            anchor="top-right"
            margin={{
              top: "-1em",
              start: "-0.5em",
            }}
          >
            <Box
              background="status-warning"
              pad="none"
              width={{
                min: "1.5em",
              }}
              justify="center"
              round="full"
              responsive={false}
              direction="column"
            >
              <Text textAlign="center">{count}</Text>
            </Box>
          </Stack>
        )}
      </Box>
    </Button>
  );
};

const Notification = (props: { model: NotificationItem }) => {
  let { model } = props; 
  return (
    <Box pad="xxsmall" color="light-1">
      {model.label}
    </Box>
  );
};

const Notifications: React.FC<NotificationsProps> = () => {
  let theme: any = useContext(ThemeContext) || {};

  let dropProps: any = { align: { top: "bottom" }, elevation: "large" };

  if (theme.dir === "rtl") dropProps.align.right = "right";
  else dropProps.align.left = "left";

  let {
    model: { notifications },
  } = useAppContext();

  let status_map = {
    [NotificationStatus.Error]: "status-error",
    [NotificationStatus.Warning]: "status-warning",
    [NotificationStatus.Success]: "status-ok",
    [NotificationStatus.Info]: "transparent",
  };

  const items = notifications.map((item: NotificationItem) => ({
    label:
      typeof item.label === "string" ? (
        <Notification key={item.id} model={item} />
      ) : (
        item.label
      ),
    icon: (
      <Box
        pad={{
          horizontal:"1em",
          vertical:"0.2em"
        }}
        color="#fff"
        round="medium"
        background={status_map[item.status ?? NotificationStatus.Info]}
      >
        {item.icon}
      </Box>
    ),
    onclick: item.onClick,
  }));

  return (
    <Menu
      dropBackground="#fff"
      focusIndicator={false}
      dropProps={dropProps}
      icon={false}
      label={
        <Box
          //background={isOpen ? "brand3" : "none"}
          color="#fff"
          margin={{
            end: "1em",
          }}
          pad="small"
          round="xsmall"
          alignSelf="center"
        >
          <NotificationButton count={notifications.length} />
        </Box>
      }
      items={items}
    />
  );
};

export default Notifications;
