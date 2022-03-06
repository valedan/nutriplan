import React from "react";
import { addDays } from "date-fns";
import { Input } from "components";
import { useLocalPlan } from "../../hooks/useLocalPlan";

// TODO: use a date range picker instead of a date input
export default function PlanDateInput() {
  const { plan, updatePlan } = useLocalPlan();

  if (!plan || !updatePlan) {
    return null;
  }

  const updateDates = (newDays: number) => {
    void updatePlan({ startDate: new Date(), endDate: addDays(new Date(), newDays) });
  };

  return (
    <div className="w-32 flex items-end">
      <Input
        value={plan?.daysInPlan}
        type="number"
        onChange={(e) => updateDates(Number(e.target.value))}
        label="Plan length"
        id="planDays"
        name="planDays"
        min={1}
      />
      <p className="ml-1 italic text-gray-700">days</p>
    </div>
  );
}
