import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";
import { sharedStyles } from "../sharedStyles";

export const CourseEdit = () => {
  return (
    <Edit
      sx={{
        "& .RaEdit-main": sharedStyles.card,
      }}
    >
      <SimpleForm>
        <NumberInput
          source="id"
          validate={[required()]}
          label="Id"
          sx={sharedStyles.input}
          fullWidth
        />
        <TextInput
          source="title"
          validate={[required()]}
          label="Title"
          sx={sharedStyles.input}
          fullWidth
        />
        <TextInput
          source="imageSrc"
          validate={[required()]}
          label="Image"
          sx={sharedStyles.input}
          fullWidth
        />
        <NumberInput
          source="instructorId"
          validate={[required()]}
          label="Instructor"
          sx={sharedStyles.input}
          fullWidth
        />
        <TextInput
          source="category"
          validate={[required()]}
          label="Category"
          sx={sharedStyles.input}
          fullWidth
        />
      </SimpleForm>
    </Edit>
  );
};
