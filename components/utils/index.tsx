import { Box, Button, Layer, Text } from "grommet";
import { useEffect, useState } from "react";

export interface MessageBoxProps {
  msg: string;
  color: string;
  onClose?: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = (props) => {
  let { msg, color, onClose } = props;

  let [showMessage, setShowMessage] = useState<{
    msg: string;
    color: string;
  } | null>(null);

  const handleClose = () => {
    setShowMessage(null);
    onClose && onClose();
  };

  useEffect(() => {
    if (msg) {
      setShowMessage({
        msg,
        color,
      });
    }
  }, [msg, color]);

  return (
    <>
      {showMessage && (
        <Layer
          position="bottom"
          onEsc={handleClose}
          onClickOutside={handleClose}
        >
          <Box background={showMessage?.color} pad="small">
            <Box pad="small">
              <Text> {showMessage?.msg} </Text>
            </Box>
            <Button label="Ok" onClick={handleClose} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default MessageBox;
