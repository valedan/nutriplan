import { ClientOnly, RequireAuth } from "providers";

export default function Plan() {
  return (
    <RequireAuth>
      <ClientOnly>
        <p>Plan page!</p>
      </ClientOnly>
    </RequireAuth>
  );
}
