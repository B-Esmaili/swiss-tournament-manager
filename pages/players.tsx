import Layout from "components/layouts/admin";
import { getPlayers } from "components/pages/players/data";
import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Box,
  Button,
  ColumnConfig,
  MouseClick,
  Text,
  KeyPress,
  Layer,
} from "grommet";
import { DataTable } from "gromet-hook-form/lib/ui-extensions";
import { FormBuilder, FormField, FormFieldType } from "gromet-hook-form";
import { Add, Trash, Save } from "grommet-icons";
import { Player } from "components/pages/players/types";
import { useEffect, useState } from "react";

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
    options: ["GM", "IM", "WGM", "FM", "WIM", "CM", "WFM", "WCM"].map(
      (e: any) => ({ text: e, value: e })
    ),
    itemLabelKey: "text",
    itemValueKey: "value",
  },
  {
    name: "sex",
    label: "Sex",
    type: FormFieldType.DropDown,
    itemLabelKey: "text",
    itemValueKey: "value",
    multiple: false,
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
  model?: Partial<Player>;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  let { model } = props;
  let [localModel, setLocalModel] = useState(model);

  let [showMessage, setShowMessage] =
    useState<{
      msg: string;
      color: string;
    } | null>(null);

  const handleSubmit = (values: any) => {
    if (values.id) {
      db.table("players").update(values.id, values);
    } else {
      db.table("players").add(values);
    }
    alert("Data Saved", "status-ok");
  };

  const alert = (msg: string, color: string) => {
    setShowMessage({ msg, color });
  };

  useEffect(() => {
    setLocalModel(model);
  }, [model]);

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
        model={localModel}
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
        {(methods) => (
          <>
            <Box direction="row" fill gridArea="actions">
              <Button
                icon={localModel?.id ? <Save /> : <Save />}
                label={localModel?.id ? "Update" : "Save"}
                type="submit"
                primary
              />
              {localModel?.id && (
                <Button
                  icon={<Add />}
                  label="Add New"
                  onClick={() =>{
                    let m =   {...Object.keys(model as any).reduce(
                      (p: any, c) => ((p[c] = ""), p),
                      {}
                    ),id: undefined};

                    setLocalModel(m);
                    return methods.reset(m)}
                  }
                  primary
                />
              )}
            </Box>

            {showMessage && (
              <Layer
                position="bottom"
                onEsc={() => setShowMessage(null)}
                onClickOutside={() => setShowMessage(null)}
              >
                <Box background={showMessage.color} pad="small">
                  <Box pad="small">
                    <Text> {showMessage.msg} </Text>
                  </Box>
                  <Button label="Ok" onClick={() => setShowMessage(null)} />
                </Box>
              </Layer>
            )}
          </>
        )}
      </FormBuilder>
    </Box>
  );
};

const Players = () => {
  let players = useLiveQuery(getPlayers, []);
  let [model, setModel] = useState<Player | null>(null);

  const handleRowClick = (e: MouseClick<Player> | KeyPress<Player>) => {
    setModel(e.datum);
  };

  return (
    <Layout>
      <Box pad="small">
        {players && (
          <DataTable
            pad="small"
            margin={{
              left: "small",
            }}
            onClickRow={handleRowClick}
            wrap={<Box direction="row" />}
            toolbar={<Toolbar model={model ?? {}} />}
            primaryKey="id"
            columns={columns}
            data={players!}
          />
        )}
      </Box>
    </Layout>
  );
};

export default Players;
