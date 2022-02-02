import ClientOnly from "../../utils/ClientOnly";
import RequireAuth from "../../utils/RequireAuth";
import RecipeDashboard from "../../components/Recipes/RecipeDashboard";

export default function Home() {
  return (
    <RequireAuth>
      <ClientOnly>
        <div className="py-4">
          <RecipeDashboard />
        </div>
      </ClientOnly>
    </RequireAuth>
  );
}
