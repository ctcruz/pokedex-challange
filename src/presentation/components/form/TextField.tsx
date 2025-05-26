import {
  TextField as MaterialTextField,
  type TextFieldProps as MaterialTextFieldProps,
} from "@mui/material";

type TextFieldProps = MaterialTextFieldProps;

const TextField = (props: TextFieldProps) => {
  return <MaterialTextField {...props} />;
};

export { TextField };
