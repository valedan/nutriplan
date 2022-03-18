import { ClientOnly, RequireAuth } from "providers";
import { RecipeDashboard } from "features/Recipes";

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
