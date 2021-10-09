import { useEffect } from "react";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import Head from "next/head";
import ClientOnly from "../../utils/ClientOnly";
import RequireAuth from "../../utils/RequireAuth";
import { useCreatePlanMutation } from "../../generated/graphql";

export default function NewPlan() {
  const router = useRouter();

  const [createPlan, { loading, error }] = useCreatePlanMutation({
    variables: { input: { name: "New plan", startDate: new Date(), endDate: addDays(new Date(), 7) } },
  });

  useEffect(() => {
    const createPlanAndRedirect = async () => {
      const result = await createPlan();
      if (result.data?.createPlan?.id) {
        void router.push(`/plans/${result.data.createPlan.id}/edit`);
      } else {
        // TODO: figure out error handling here
        console.error(result);
      }
    };
    void createPlanAndRedirect();
  }, [createPlan, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <RequireAuth>
      <Head>
        <title key="title">New plan</title>
      </Head>

      <ClientOnly>
        <h1>Creating new plan...</h1>
      </ClientOnly>
    </RequireAuth>
  );
}
