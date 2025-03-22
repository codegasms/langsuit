import {
  Button,
  Datagrid,
  List,
  NumberField,
  TextField,
  TextInput,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import { sharedStyles } from "../sharedStyles";

const listFilters = [
  <TextInput source="q" label="Search" alwaysOn sx={sharedStyles.input} />,
];

export const CourseList = () => {
  const navigate = useNavigate();

  const AnalyticsButton = () => (
    <Button
      label="View Analytics"
      onClick={() => navigate("/courses/analytics")}
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
        <TextField source="imageSrc" />
        <NumberField source="instructorId" />
        <TextField source="category" />
      </Datagrid>
    </List>
  );
};
