import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
        <NumberInput source="instructorId" validate={[required()]} label="Instructor" />
        <TextInput source="category" validate={[required()]} label="Category" />
      </SimpleForm>
    </Edit>
  );
};
