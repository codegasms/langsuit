import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
  TextInput,
} from "react-admin";
import { sharedStyles } from "../sharedStyles";

const listFilters = [
  <TextInput source="q" label="Search" alwaysOn sx={sharedStyles.input} />,
];

export const LessonList = () => {
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
        <TextField source="title" />
        <ReferenceField source="unitId" reference="units" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};