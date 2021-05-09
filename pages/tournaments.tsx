import Layout from "components/layouts/admin";
import { getTournaments } from "components/pages/tournaments/data";
import { Tournament } from "components/pages/tournaments/types";
import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";
import { Box, Button, ColumnConfig, Text } from "grommet";
import { DataTable } from "gromet-hook-form/lib/ui-extensions";
import { FormBuilder, FormField, FormFieldType } from "gromet-hook-form";
import { Add, Trash } from "grommet-icons";

const columns: ColumnConfig<Tournament>[] = [
  {
    property: "name",
    header: "Name",
    render : ({id , name})=>(<Text> {id} - {name} </Text>)
  },
  {
    property: "numPlayers",
    header: "Number Of Players",
  },
  {
    property: "numRatedPlayers",
    header: "Number Of Rated Players",
  },
  {
    property: "id",
    header: "remove",
    size: "8em",
    render: ({ id }) => {
      const handleRemove = () => {
        let shoudl_remove = confirm("Are you sure?");
        if (shoudl_remove) {
          db.table("tournaments").delete(id);
        }
      };

      return (
        <Button
          size="small"
          color="status-error"
          primary
          icon={<Trash />}
          label="remove"
          onClick={handleRemove}
        />
      );
    },
  },
];

const tourFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: FormFieldType.Text,
  },
  {
    name: "numPlayers",
    label: "Number Of Players",
    type: FormFieldType.Number,
    defaultValue: 0,
  },
  {
    name: "numRatedPlayers",
    label: "Number Of Rated Players",
    type: FormFieldType.Number,
    defaultValue: 0,
  },
];

const Toolbar = () => {
  const handleSubmit = (values: any) => {
    db.table("tournaments").add(values);
  };

  return (
    <Box width="medium" pad="small" height="auto" round="small" border={{
      position:"right"

    }}>
      <FormBuilder fields={tourFormFields} onSubmit={handleSubmit}>
        <Button icon={<Add />} label="add" type="submit" primary />
      </FormBuilder>
    </Box>
  );
};

const Tournaments = () => {
  let tournaments = useLiveQuery(getTournaments, []);

  return (
    <Layout>
      <Box pad="small">
        {tournaments && (
          <DataTable
            pad="small"
            margin={{
              left:"small"
            }}
            wrap={<Box direction="row"/>}
            toolbar={<Toolbar />}
            primaryKey="id"
            columns={columns}
            data={tournaments!}
          />
        )}
      </Box>
    </Layout>
  );
};

export default Tournaments;
