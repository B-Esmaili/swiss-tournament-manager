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
  Accordion,
  AccordionPanel,
  FileInput,
} from "grommet";
import { DataTable } from "gromet-hook-form/lib/ui-extensions";
import { DataTableContext, useDataTableContext } from "gromet-hook-form";
import { FormBuilder, FormField, FormFieldType } from "gromet-hook-form";
import { Add, Trash, Save } from "grommet-icons";
import { Player } from "components/pages/players/types";
import { ChangeEvent, useEffect, useState } from "react";
import { importPlayerFromTRF } from "utils";

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
    defaultValue: "",
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
    defaultValue: "",
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
    defaultValue: "",
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
    defaultValue: "",
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
    defaultValue: "",
  },
];

interface ToolbarProps {
  model?: Partial<Player>;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  let { model } = props;

  let {
    dispatch,
    state: { contextData },
  } = useDataTableContext();

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
    dispatch({
      type: "merge-value",
      payload: { contextData: { model: null } },
    });
    alert("Data Saved", "status-ok");
  };

  const alert = (msg: string, color: string) => {
    setShowMessage({ msg, color });
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
        model={contextData?.model}
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
              {contextData?.model !== null && (
                <Button
                  icon={contextData?.model?.id ? <Save /> : <Save />}
                  label={contextData?.model?.id ? "Update" : "Save"}
                  type="submit"
                  primary
                />
              )}
              {contextData?.model != {} && (
                <Button
                  icon={<Add />}
                  label="Add New"
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: "merge-value",
                      payload: { contextData: { model: {} } },
                    });
                    return methods.reset();
                  }}
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
  let { dispatch } = useDataTableContext();

  const handleRowClick = (e: MouseClick<Player> | KeyPress<Player>) => {
    dispatch({
      type: "merge-value",
      payload: { contextData: { model: e.datum } },
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files![0];
    let players = await importPlayerFromTRF(file);
    db.table("players").bulkAdd(players);
  };

  const [selection, setSelection] = useState<number[]>([]);

  const handleDeleteSelected = () => {
    if (confirm("Are you sure?")) {
      db.table("players").bulkDelete(selection);
    }
  };

  return (
    <Layout>
      <DataTableContext.Consumer>
        {({ state: { contextData } }) => (
          <Box pad="small">
            <Box
              direction="row"
              fill
              margin={{
                bottom: "small",
              }}
            >
              <Box fill>
                <Accordion>
                  <AccordionPanel label="Import from TRF">
                    <FileInput onChange={handleFileChange} />
                  </AccordionPanel>
                </Accordion>
              </Box>
              <Box width="10em">
                {selection.length > 0 && (
                  <Button
                    label="Delete Selected"
                    color="status-error"
                    onClick={handleDeleteSelected}
                  />
                )}
              </Box>
            </Box>
            {players && (
              <DataTable
                pad="small"
                margin={{
                  left: "small",
                }}
                paginate={{
                   type:"button-based",
                   pageSize:20,
                   enabled:true,
                   pagerOptions : {
                      step:20
                   }
                }}
                select={selection}
                onSelect={(s: (number | string)[]) => setSelection(s as any)}
                onClickRow={handleRowClick}
                wrap={<Box direction="row" />}
                toolbar={<Toolbar model={contextData?.model ?? {}} />}
                primaryKey="id"
                columns={columns}
                data={players!}
              />
            )}
          </Box>
        )}
      </DataTableContext.Consumer>
    </Layout>
  );
};

export default Players;
