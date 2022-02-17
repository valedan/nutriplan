import ClientOnly from "../utils/ClientOnly";
import RequireAuth from "../utils/RequireAuth";
import PlanDashboard from "../components/Plans/PlanDashboard";

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
