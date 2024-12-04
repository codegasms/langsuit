import { Create, SimpleForm, TextInput, required } from "react-admin";

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
        <TextInput source="instructorId" validate={[required()]} label="Instructor" />
        <TextInput source="category" validate={[required()]} label="Category" />
      </SimpleForm>
    </Create>
  );
};
