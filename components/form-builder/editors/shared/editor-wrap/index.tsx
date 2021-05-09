import { ErrorMessage } from "@hookform/error-message";
import { Box, Button,  Tip } from "grommet";
import { useFormState } from "react-hook-form";
import styled from "styled-components";
import { EditorWrapProps } from "./types";
import { CircleInformation } from "grommet-icons";

export const StyledEditorWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin:0.5em 0;
`;

const ValidationMessage = styled.span`
  color: ${(props) => props.theme.validation.color};
`;

const Container = styled.div<{ labelPosition: "top" | "side" }>`
  display: flex;
  flex-direction: ${({ labelPosition }) =>
    labelPosition == "side" ? "row" : "column"};
`;

const Label = styled.label`
  width: 15em;
`;

const WidthEditorWrap: React.FC<EditorWrapProps> = (props) => {
  const { children, name, label, labelPosition, tip } = props;
  const { errors } = useFormState();

  return (
    <Container labelPosition={labelPosition ?? "side"}>
      <Label>
        {label}
        {tip && (
          <Tip
            plain
            content={
              <Box background="light-3" pad="small" round="small" border={{
                color:"dark-4",
                size:"small"
              }}>
                {tip}
              </Box>
            }
            dropProps={{ align: { left: "right" }}}
          >
            <Button icon={<CircleInformation size="medium" color="neutral-3" />} />
          </Tip>
        )}
      </Label>
      <StyledEditorWrap>
        {children}
        {errors?.[name] && (
          <ErrorMessage
            errors={errors}
            name={name}
            as={<ValidationMessage />}
          ></ErrorMessage>
        )}
      </StyledEditorWrap>
    </Container>
  );
};

export default WidthEditorWrap;
