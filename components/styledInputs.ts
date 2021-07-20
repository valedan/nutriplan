import styled, { css } from "styled-components";

export const BaseInput = css<{ error?: boolean; type: string }>`
  font-size: var(--typography-bodySize);
  border: 1px solid ${(props) => (props.error ? "var(--color-brightRed)" : "var(--color-black)")};
  border-radius: 8px;
  padding-left: var(--spacing-grid-3);
  ::placeholder {
    color: var(--color-darkGrey);
  }
  :focus {
    outline: none;
    border: 2px solid var(--color-primary);
  }
`;

export const Label = styled.label`
  font-size: var(--typography-smallSize);
  line-height: var(--typography-headingFiveSize);
`;

export const Input = styled.input<{ error?: boolean; type: string }>`
  ${BaseInput}
  height: var(--spacing-vertical-1);
`;

export const TextArea = styled.textarea`
  ${BaseInput}

  resize: none;
  font-family: var(--typography-bodyFont);
  height: 100%;
`;

export const NumberInput = styled(Input)`
  max-width: 90px;
`;

export const Hint = styled.span`
  font-size: var(--typography-smallSize);
  line-height: var(--typography-headingFiveSize);
  font-style: italic;
  margin-top: 2px;
  padding-left: var(--spacing-grid-1);
  color: var(--color-black);
`;

export const Error = styled(Hint)`
  color: var(--color-brightRed);
`;
