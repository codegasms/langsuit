import {
  Button,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
  TextInput,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import { sharedStyles } from "../sharedStyles";

const listFilters = [
  <TextInput source="q" label="Search" alwaysOn sx={sharedStyles.input} />,
];

export const UnitList = () => {
  const navigate = useNavigate();

  const AnalyticsButton = () => (
    <Button
      label="View Analytics"
      onClick={() => navigate("/units/analytics")}
      sx={sharedStyles.button}
    />
  );

  return (
    <List
      filters={listFilters}
      actions={<AnalyticsButton />}
      sx={{
        "& .RaList-main": sharedStyles.card,
      }}
    >
      <Datagrid rowClick="edit" sx={sharedStyles.table}>
        <NumberField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <ReferenceField source="courseId" reference="courses" />
        <TextField source="order" />
      </Datagrid>
    </List>
  );
};
