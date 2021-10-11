import ClientOnly from "../utils/ClientOnly";
import RequireAuth from "../utils/RequireAuth";

export default function Recipes() {
  return (
    <RequireAuth>
      <ClientOnly>
        {Array(200)
          .fill(undefined)
          .map((_, i) => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <h1>Recipe {i}</h1>
            </div>
          ))}
        <p>Recipes page!</p>
      </ClientOnly>
    </RequireAuth>
  );
}
