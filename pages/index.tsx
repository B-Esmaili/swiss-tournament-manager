import { FormBuilder } from "components/form-builder";
import { FormField, FormFieldType } from "components/form-builder/types";
import { Button } from "grommet";
import styled from "styled-components";
import "whatwg-fetch";
import Layout from "components/layouts/admin";
import { useEffect } from "react";
import { useAppContext } from "context/app-context";
import { Deliver } from "grommet-icons";
import { NotificationStatus } from "context/app-context/types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em;
`;

const StyledFormBuilder = styled(FormBuilder)`
  background-color: #f1f1f1;
  padding: 2em;
  border-radius: 4px;
  border: solid 1px #aaa;
  width: 900px;
`;

const Index = () => {
  const fields: FormField[] = [
    {
      label: "First Name:",
      name: "firstname",
      defaultValue: "Behnam",
      type: FormFieldType.Text,
      maxLength: 20,
      minLength: 10,
      required: true,
      submitTrigger: true,
      tip: "First Name",
    },
    {
      label: "Age:",
      name: "age",
      defaultValue: 25,
      type: FormFieldType.Number,
      max: 100,
      min: 5,
      required: true,
      tip: "Your age",
    },
    {
      label: "Birth Date:",
      name: "birthdate",
      defaultValue: "",
      type: FormFieldType.Date,
      required: true,
      minDate: "2021/04/10",
      maxDate: "2021/04/15",
      tip: "Enter your birtdate",
    },
    {
      label: "Programmer",
      name: "programmer",
      defaultValue: 2,
      type: FormFieldType.DropDown,
      options: { url: "/api/form/test/drop-down" },
      itemLabelKey: "name",
      itemValueKey: "value",
      multiple: true,
      tip: "Name of the programmer",
      required: true,
    },
    {
      label: "Programming Language :",
      name: "plang",
      defaultValue: 2,
      type: FormFieldType.DropDown,
      options: [
        {
          name: "C++",
          value: 1,
        },
        {
          name: "Javascript",
          value: 2,
        },
        {
          name: "Go",
          value: 3,
        },
      ],
      itemLabelKey: "name",
      itemValueKey: "value",
      tip: "You'r prefered programming language",
    },
    {
      label: "Password",
      name: "Password",
      defaultValue: "",
      type: FormFieldType.Password,
      tip: "Choose as passsword",
      showPasswordStrength: true,
      minPasswordStrength: 50,
      required: true,
    },
    {
      label: "resume",
      name: "resume",
      defaultValue: "",
      type: FormFieldType.File,
      tip: "Upload you'r RESUME",
      multiple: true,
      required: true,
    },
  ];

  const handleSubmit = (values: any) => {
    alert(JSON.stringify(values));
  };

  let { dispatch } = useAppContext();

  useEffect(() => {
    dispatch({
      type: "AddNotification",
      payload: {
        id: 1,
        label: "Product P3 Delivered Successfully",
        icon: <Deliver />,
        status: NotificationStatus.Success,
      },
    });
    dispatch({
      type: "AddNotification",
      payload: {
        id: 1,
        label: "Product P3 Delivery Failed",
        icon: <Deliver />,
        status: NotificationStatus.Error,
      },
    });

    dispatch({
      type: "SetSiteMap",
      payload: [
        "MasterPage",
        "Sub Page",
        {
          label: "Detail Page",
          link: "/about",
        },
      ],
    });
  }, []);

  return (
    <Layout>
      <Container>
        <StyledFormBuilder fields={fields} onSubmit={handleSubmit}>
          <Button type="submit" primary>
            Submit
          </Button>
        </StyledFormBuilder>
      </Container>
    </Layout>
  );
};

export default Index;
