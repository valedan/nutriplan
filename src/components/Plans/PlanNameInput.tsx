import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useGetPlanQuery, useUpdatePlanMutation } from "../../generated/graphql";

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
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Plan name
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
        />
      </label>
    </div>
  );
}
