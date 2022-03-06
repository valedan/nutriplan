import React, { useState, useEffect } from "react";
import { addDays, differenceInCalendarDays, parseISO } from "date-fns";
import { debounce } from "lodash";
import { Input } from "components";
import { useUpdatePlanMutation } from "generated/graphql/hooks";
import { useCurrentPlan } from "../../PlanContext";
import { useReadPlanInfo } from "../../hooks/useReadPlanInfo";

export default function PlanDateInput() {
  const { id } = useCurrentPlan();
  const [days, setDays] = useState(7);
  const { plan } = useReadPlanInfo();
  const [updatePlan] = useUpdatePlanMutation();

  useEffect(() => {
    if (plan) {
      setDays(differenceInCalendarDays(parseISO(plan.endDate), parseISO(plan.startDate)));
    }
  }, [plan]);

  const updateDates = debounce((newDays: number) => {
    void updatePlan({
      variables: { input: { id, startDate: new Date(), endDate: addDays(Date.now(), newDays) } },
    });
  }, 500);

  const handleChangeDates = (newDays: number) => {
    setDays(newDays);
    updateDates(newDays);
  };

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
      />
      <p className="ml-1 italic text-gray-700">days</p>
    </div>
  );
}
