import ClientOnly from "../utils/ClientOnly";
import RequireAuth from "../utils/RequireAuth";

export default function Groceries() {
  return (
    <RequireAuth>
      <ClientOnly>
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold leading-tight text-gray-700">Groceries</h1>
            </div>
          </header>
        </div>
      </ClientOnly>
    </RequireAuth>
  );
}
