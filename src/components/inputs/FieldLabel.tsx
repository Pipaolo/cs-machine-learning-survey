import type { FormLabelProps } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";

interface Props {
  isRequired?: boolean;
  label?: string;
  labelProps?: FormLabelProps;
}

const FieldLabel = ({ label, labelProps, isRequired }: Props) => {
  if (!label) {
    return null;
  }
  return (
    <FormLabel {...labelProps}>
      {label}
      {isRequired && <span className="ml-1 font-bold text-red-500">*</span>}
    </FormLabel>
  );
};

export default FieldLabel;
