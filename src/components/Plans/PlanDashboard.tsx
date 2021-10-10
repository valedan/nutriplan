import Link from "next/link";
import { useGetPlansQuery } from "../../generated/graphql";
import { Button } from "../shared";

export default function PlanDashboard() {
  const { loading, error, data } = useGetPlansQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  if (!data?.plans.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-4 text-xl leading-6 font-medium text-gray-900">Get started by creating your first plan!</h1>
        <Link href="plans/new" passHref>
          <Button>Create meal plan</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-center">Plan Dashboard</h1>
      <ul>
        {data.plans.map((plan) => (
          <li key={plan.id}>{plan.name}</li>
        ))}
      </ul>
      <Link href="plans/new" passHref>
        <Button>Create meal plan</Button>
      </Link>
    </div>
  );
}
