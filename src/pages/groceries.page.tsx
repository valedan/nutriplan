import ClientOnly from "../utils/ClientOnly";
import RequireAuth from "../utils/RequireAuth";

export default function Groceries() {
  return (
    <RequireAuth>
      <ClientOnly>
        <p>Groceries page!</p>
      </ClientOnly>
    </RequireAuth>
  );
}
