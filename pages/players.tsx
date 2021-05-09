import Layout from "components/layouts/admin";
import { getTournaments } from "components/pages/tournaments/data";
import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";
import { Box, Button, ColumnConfig, MouseClick, Text, KeyPress } from "grommet";
import { DataTable } from "gromet-hook-form/lib/ui-extensions";
import { FormBuilder, FormField, FormFieldType } from "gromet-hook-form";
import { Add, Trash } from "grommet-icons";
import { Player } from "components/pages/players/types";
import { useState } from "react";

const columns: ColumnConfig<Player>[] = [
  {
    property: "sex",
    header: "Sex",
    render: ({ sex }) => <Text> {sex === "w" ? "Woman" : "Man"} </Text>,
  },
  {
    property: "title",
    header: "FIDE Title",
  },
  {
    property: "name",
    header: "Name",
  },
  {
    property: "fideRating",
    header: "FIDE Rating",
  },
  {
    property: "fideFederation",
    header: "FIDe Federation",
  },
  {
    property: "fideNumber",
    header: "FIDE Number",
  },
  {
    property: "birthDate",
    header: "Birth Date",
  },
  {
    property: "id",
    header: "remove",
    size: "8em",
    render: ({ id }) => {
      const handleRemove = async () => {
        let existsInRels =
          (await db.table("playerInTour").where({ playerId: id }).count()) >
            0 ||
          (await db
            .table("rounds")
            .filter((e) => e.playerId === id || e.opponentId === id)
            .count()) > 0;
        if (existsInRels) {
          alert(
            "Player is participated in a tournament and cannot be deleted."
          );
          return;
        }

        let shoudl_remove = confirm("Are you sure?");
        if (shoudl_remove) {
          db.table("players").delete(id);
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

const playersFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: FormFieldType.Text,
    gridArea: "left",
  },
  {
    name: "title",
    label: "FIDE Title",
    type: FormFieldType.DropDown,
    gridArea: "left",
    options :[
      "GM" , "IM" , "WGM" , "FM" , "WIM" ,  "CM" ,  "WFM" , "WCM"
    ].map((e : any)=>({ text : e , value : e })),
    itemLabelKey:"text",
    itemValueKey:"value"
  },
  {
    name: "sex",
    label: "Sex",
    type: FormFieldType.DropDown,
    itemLabelKey: "text",
    itemValueKey: "value",
    multiple:false,
    options: [
      {
        text: "w",
        value: "w",
      },
      {
        text: "m",
        value: "m",
      },
    ],
    gridArea: "left",
  },
  {
    name: "fideRating",
    label: "FIDE Rating",
    type: FormFieldType.Number,
    defaultValue: 0,
    gridArea: "right",
  },
  {
    name: "fideFederation",
    label: "FIDE Federation",
    type: FormFieldType.Text,
    gridArea: "right",
  },
  {
    name: "fideNumber",
    label: "FIDE Number",
    type: FormFieldType.Number,
    defaultValue: 0,
    gridArea: "right",
  },
  {
    name: "birthDate",
    label: "Birth Date",
    type: FormFieldType.Text,
    gridArea: "left",
  },
];

interface ToolbarProps {
  model?: Player;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  let { model } = props;

  const handleSubmit = (values: any) => {
    db.table("tournaments").add(values);
  };

  return (
    <Box
      width="large"
      pad="small"
      height="auto"
      round="small"
      border={{
        position: "right",
      }}
    >
      <FormBuilder
        fields={playersFormFields}
        model={model}
        onSubmit={handleSubmit}
        rows={["flex", "2em"]}
        columns={["50%", "50%"]}
        areas={[
          {
            name: "right",
            start: [1, 0],
            end: [1, 1],
          },
          {
            name: "left",
            start: [0, 0],
            end: [0, 1],
          },
          {
            name: "actions",
            start: [0, 1],
            end: [1, 1],
          },
        ]}
      >
        <Button
          gridArea="actions"
          icon={<Add />}
          label={model?.id ? "Update" : "Add"}
          type="submit"
          primary
        />
      </FormBuilder>
    </Box>
  );
};

const Players = () => {
  let tournaments = useLiveQuery(getTournaments, []);
  let [model, setModel] = useState<Player | null>(null);

  const handleRowClick = (e: MouseClick<Player> | KeyPress<Player>) => {
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

export default Players;
