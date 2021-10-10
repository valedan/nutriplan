import ClientOnly from "../../../utils/ClientOnly";
import RequireAuth from "../../../utils/RequireAuth";

export default function Plan() {
  return (
    <RequireAuth>
      <ClientOnly>
        <p>Plan page!</p>
      </ClientOnly>
    </RequireAuth>
  );
}
