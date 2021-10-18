import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { formatDistanceToNow } from "date-fns";
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
    <div className="px-8">
      <header className="flex w-full justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-gray-700">Plans</h1>
        </div>
        <Link href="plans/new" passHref>
          <Button>Create meal plan</Button>
        </Link>
      </header>
      <div>
        <ul className="flex flex-col gap-2">
          {/* sort mutates the array  */}
          {[...data.plans]
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .map((plan) => (
              <li key={plan.id}>
                <a
                  // TODO: either this should go to the plan viewer, or the editor should be presentable for read-only interactions
                  href={`/plans/${plan.id}/edit`}
                  className="block hover:bg-gray-50 bg-white shadow overflow-hidden sm:rounded-md"
                >
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-blue-600 truncate">{plan.name}</p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            {/* <p>Created {formatDistanceToNow(new Date(plan.createdAt))} ago</p> */}
                            <p>Updated {formatDistanceToNow(new Date(plan.updatedAt))} ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
