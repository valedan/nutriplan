import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Input } from "components";
import { useGetPlanQuery, useUpdatePlanMutation } from "generated/graphql/hooks";
import { useCurrentPlan } from "../PlanContext";

interface Props {
  className?: string;
}

export default function PlanNameInput({ className }: Props) {
  const { id } = useCurrentPlan();
  const { data, loading, error } = useGetPlanQuery({ variables: { id } });
  const [name, setName] = useState("");

  useEffect(() => {
    if (data?.plan?.name) {
      setName(data.plan.name);
    }
  }, [data]);

  const [updatePlan] = useUpdatePlanMutation();

  const updateName = debounce((newName: string) => {
    void updatePlan({ variables: { input: { id, name: newName } } });
  }, 500);

  const handleChangeName = (newName: string) => {
    setName(newName);
    updateName(newName);
  };

  if (loading || error || !data?.plan) return null;

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
