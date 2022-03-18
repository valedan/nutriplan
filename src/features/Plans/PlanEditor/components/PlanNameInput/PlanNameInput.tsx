import React from "react";
import { Input } from "components";
import { useLocalPlan } from "../../hooks/useLocalPlan";

interface Props {
  className?: string;
}

export default function PlanNameInput({ className }: Props) {
  const { plan, updatePlan } = useLocalPlan();

  if (!plan || !updatePlan) {
    return null;
  }

  return (
    <Input
      value={plan.name}
      onChange={(e) => updatePlan({ name: e.target.value })}
      label="Plan name"
      id="planName"
      name="planName"
      className={className}
    />
  );
}
