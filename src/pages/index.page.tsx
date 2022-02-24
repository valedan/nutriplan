import { ClientOnly, RequireAuth } from "providers";
import { PlanDashboard } from "features/Plans";

export default function Home() {
  return (
    <RequireAuth>
      <ClientOnly>
        <div className="py-4">
          <PlanDashboard />
        </div>
      </ClientOnly>
    </RequireAuth>
  );
}
