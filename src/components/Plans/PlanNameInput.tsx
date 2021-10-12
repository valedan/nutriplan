import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useGetPlanQuery, useUpdatePlanMutation } from "../../generated/graphql";
import { Input } from "../shared";

interface Props {
  planId: number;
}

export default function PlanNameInput({ planId }: Props) {
  const { data, loading, error } = useGetPlanQuery({ variables: { id: Number(planId) } });
  const [name, setName] = useState("");

  useEffect(() => {
    if (data?.plan?.name) {
      setName(data.plan.name);
    }
  }, [data]);

  const [updatePlan] = useUpdatePlanMutation();

  const updateName = debounce((newName: string) => {
    void updatePlan({ variables: { input: { id: Number(planId), name: newName } } });
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
    />
  );
}
