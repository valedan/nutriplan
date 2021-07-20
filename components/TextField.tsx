import { ReactNode } from "react";
import styled from "styled-components/macro";
import { forwardRef } from "react";
import { Label, Input, Error, Hint } from "./styledInputs";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type InputElement = HTMLInputElement | HTMLTextAreaElement;

export type FieldProps = {
  name: string;
  id?: string;
  type?: string;
  label?: string;
  hint?: string | ReactNode;
  placeholder?: string;
  ref?: any;
  className?: string;
  errorMessage?: string;
  value?: any;
  onChange?: any;
};

// eslint-disable-next-line react/display-name
const TextField = forwardRef<InputElement, FieldProps>(
  ({ errorMessage, label, hint, type = "text", className, ...props }, ref) => {
    return (
      <Wrapper className={className}>
        <Label htmlFor={props.id || props.name}>{label}</Label>

        <Input type={type} {...props} ref={ref as any} />

        {errorMessage ? <Error>{errorMessage}</Error> : hint ? <Hint>{hint}</Hint> : null}
      </Wrapper>
    );
  }
);

export default TextField;
