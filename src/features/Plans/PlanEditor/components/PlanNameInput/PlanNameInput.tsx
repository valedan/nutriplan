import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Input } from "components";
import { useUpdatePlanMutation } from "generated/graphql/hooks";
import { useCurrentPlan } from "../../PlanContext";
import { useReadPlanInfo } from "../../hooks/useReadPlanInfo";

interface Props {
  className?: string;
}

export default function PlanNameInput({ className }: Props) {
  const { id } = useCurrentPlan();
  const { plan } = useReadPlanInfo();
  const [name, setName] = useState("");
  const [updatePlan] = useUpdatePlanMutation();

  useEffect(() => {
    if (plan) {
      setName(plan.name);
    }
  }, [plan]);

  const updateName = debounce((newName: string) => {
    void updatePlan({ variables: { input: { id, name: newName } } });
  }, 500);

  const handleChangeName = (newName: string) => {
    setName(newName);
    updateName(newName);
  };

  return (
    <Input
      value={name}
      onChange={(e) => handleChangeName(e.target.value)}
      label="Plan name"
      id="planName"
      name="planName"
      className={className}
    />
  );
}
