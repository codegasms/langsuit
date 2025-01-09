import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  SelectField,
  TextField,
  TextInput,
} from "react-admin";
import { sharedStyles } from "../sharedStyles";

const listFilters = [
  <TextInput source="q" label="Search" alwaysOn sx={sharedStyles.input} />,
];

export const ChallengeList = () => {
  return (
    <List
      filters={listFilters}
      sx={{
        "& .RaList-main": sharedStyles.card,
      }}
    >
      <Datagrid
        rowClick="edit"
        sx={sharedStyles.table}
      >
        <NumberField source="id" />
        <TextField source="question" />
        <SelectField
          source="type"
          choices={[
            { id: "SELECT", name: "SELECT" },
            { id: "ASSIST", name: "ASSIST" },
          ]}
        />
        <ReferenceField source="lessonId" reference="lessons" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};