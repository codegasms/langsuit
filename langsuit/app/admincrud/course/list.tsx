import { Datagrid, List, NumberField, TextField, TextInput } from "react-admin";
import { sharedStyles } from "../sharedStyles";

const listFilters = [
  <TextInput source="q" label="Search" alwaysOn sx={sharedStyles.input} />,
];

export const CourseList = () => {
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
        <TextField source="imageSrc" />
        <NumberField source="instructorId" />
        <TextField source="category" />
      </Datagrid>
    </List>
  );
};
