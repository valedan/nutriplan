import React from "react";
import styled, { css } from "styled-components/macro";
import { forwardRef } from "react";

// const SelectedStyles = css`
//   background-color: var(--color-secondary);
//   color: var(--color-white);
// `;

// const Suggestion = styled.div<{ selected: boolean; ref: any }>`
//   height: var(--spacing-vertical-1);
//   padding: 0 var(--spacing-grid-3);
//   cursor: pointer;
//   background-color: var(--color-white);
//   border-bottom: 1px solid var(--color-secondary);
//   font-size: var(--typography-bodySize);
//   ${(props) => props.selected && SelectedStyles};
// `;

interface Props extends React.HTMLAttributes<HTMLElement> {
  description: string;
  selected: boolean;
}

const FoodSuggestion = forwardRef<HTMLElement, Props>(({ description, children, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className="py-2 cursor-pointer hover:bg-blue-200 px-4">
      {children}
    </div>
  );
});

export default FoodSuggestion;
