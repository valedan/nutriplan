import React, { useState, useEffect } from "react";
import { addDays, differenceInCalendarDays } from "date-fns";
import { debounce } from "lodash";
import { useGetPlanQuery, useUpdatePlanMutation } from "../../generated/graphql";
import { Input } from "../shared";

interface Props {
  planId: number;
}

export default function PlanDateInput({ planId }: Props) {
  const { data, loading, error } = useGetPlanQuery({ variables: { id: Number(planId) } });
  const [days, setDays] = useState(7);

  useEffect(() => {
    if (data?.plan?.startDate && data?.plan?.endDate) {
      setDays(differenceInCalendarDays(data.plan.endDate, data.plan.startDate));
    }
  }, [data]);

  const [updatePlan] = useUpdatePlanMutation();

  const updateDates = debounce((newDays: number) => {
    void updatePlan({
      variables: { input: { id: Number(planId), startDate: new Date(), endDate: addDays(Date.now(), newDays) } },
    });
  }, 500);

  const handleChangeDates = (newDays: number) => {
    setDays(newDays);
    updateDates(newDays);
  };

  if (loading || error || !data?.plan) return null;

  return (
    <div className="w-32 flex items-end">
      <Input
        value={days}
        type="number"
        onChange={(e) => handleChangeDates(Number(e.target.value))}
        label="Plan length"
        id="planDays"
        name="planDays"
        min={1}
        className=""
      />
      <p className="ml-1 italic text-gray-700">days</p>
    </div>
  );
}
