import Layout from "components/layouts/admin";
import { getTournaments } from "components/pages/tournaments/data";
import { Tournament } from "components/pages/tournaments/types";
import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";
import { Box, Button, ColumnConfig, KeyPress, MouseClick, Text } from "grommet";
import { DataTable } from "gromet-hook-form/lib/ui-extensions";
import { FormBuilder, FormField, FormFieldType } from "gromet-hook-form";
import { Add, Trash } from "grommet-icons";
import MessageBox from "components/utils";
import { useState } from "react";
import { Player } from "components/pages/players/types";

const columns: ColumnConfig<Tournament>[] = [
  {
    property: "name",
    header: "Name",
    render: ({ id, name }) => (
      <Text>
        {" "}
        {id} - {name}{" "}
      </Text>
    ),
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

interface ToolbarProps {
  model?: Partial<Tournament>;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  let { model } = props;
  let [msg, setMsg] = useState<null | any>(null);

  const handleSubmit = (values: any) => {
    if (values.id) {
      db.table("tournaments").update(values.id, values);
    } else {
      db.table("tournaments").add(values);
    }
    setMsg({
      msg: "Data Saved",
      color: "status-ok",
    });
  };

  return (
    <Box
      width="medium"
      pad="small"
      height="auto"
      round="small"
      border={{
        position: "right",
      }}
    >
      <MessageBox {...msg} />
      <FormBuilder
        fields={tourFormFields}
        onSubmit={handleSubmit}
        model={model}
      >
        <Button icon={<Add />} label="add" type="submit" primary />
      </FormBuilder>
    </Box>
  );
};

const Tournaments = () => {
  let tournaments = useLiveQuery(getTournaments, []);
  let [model, setModel] = useState<Tournament | null>(null);

  const handleRowClick = (e: MouseClick<Tournament> | KeyPress<Tournament>) => {
    setModel(e.datum);
  };

  return (
    <Layout>
      <Box pad="small">
        {tournaments && (
          <DataTable
            pad="small"
            margin={{
              left: "small",
            }}
            onClickRow={handleRowClick}
            wrap={<Box direction="row" />}
            toolbar={<Toolbar model={model} />}
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
