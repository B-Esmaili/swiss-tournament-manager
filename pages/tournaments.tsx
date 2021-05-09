import Layout from "components/layouts/admin";
import { getTournaments } from "components/pages/tournaments/data";
import { Tournament } from "components/pages/tournaments/types";
import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";
import { Box, Button, ColumnConfig } from "grommet";
import { DataTable } from "gromet-hook-form/lib/ui-extensions";
import { FormBuilder, FormField } from "gromet-hook-form";
//import { DataTable } from 'grommet';
import { Add, Trash } from "grommet-icons";

const columns: ColumnConfig<Tournament>[] = [
  {
    property: "name",
    header: "Name",
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

const tourFormFields : FormField [] =[
 
]

const Toolbar = () => {
  return (
    <Box>
      <FormBuilder fields={tourFormFields}>

      </FormBuilder>
    </Box>
  );
};

const Tournaments = () => {
  let tournaments = useLiveQuery(getTournaments, []);

  return (
    <Layout>
      <Box direction="row" justify="start">
        <Button
          icon={<Add />}
          label="add"
          primary
          onClick={() => {
            db.table("tournaments").add({
              name: "asdasd",
              numPlayers: 10,
              numRatedPlayers: 320,
            });
          }}
        />
      </Box>
      <Box>
        {tournaments && (
          <DataTable
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
