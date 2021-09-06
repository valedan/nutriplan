import React, { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  description: string;
  selected: boolean;
}

const FoodSuggestion = forwardRef<HTMLDivElement, Props>(({ description, children, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className="py-2 cursor-pointer hover:bg-blue-200 px-4">
      {children}
    </div>
  );
});

FoodSuggestion.displayName = "FoodSuggestion";

export default FoodSuggestion;
