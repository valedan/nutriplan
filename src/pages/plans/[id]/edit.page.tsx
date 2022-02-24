import { ClientOnly, RequireAuth } from "providers";
import { PlanEditor } from "features/Plans";

export default function EditPlan() {
  return (
    <RequireAuth>
      <ClientOnly>
        <PlanEditor />
      </ClientOnly>
    </RequireAuth>
  );
}
