import ClientOnly from "../../../utils/ClientOnly";
import RequireAuth from "../../../utils/RequireAuth";
import PlanEditor from "../../../components/Plans/PlanEditor";

export default function EditPlan() {
  return (
    <RequireAuth>
      <ClientOnly>
        <PlanEditor />
      </ClientOnly>
    </RequireAuth>
  );
}
