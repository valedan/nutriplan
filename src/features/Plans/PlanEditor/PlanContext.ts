import { createContext, useContext } from "react";

interface IPlanContext {
  id: number;
  refetch: () => void;
}

export const PlanContext = createContext<IPlanContext | undefined>(undefined);

export const useCurrentPlan = () => {
  const plan = useContext(PlanContext);

  if (!plan) {
    throw new Error("useCurrentPlan must be used within a PlanProvider");
  }

  return plan;
};
