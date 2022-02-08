import React, { useState } from "react";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/outline";
import { formatDistanceToNow, addDays } from "date-fns";
import { Plan, useCreatePlanMutation, useDeletePlanMutation, useGetPlansQuery } from "../../generated/graphql/hooks";
import { Button, LoadingScreen } from "../shared";
import AlertModal from "../shared/Modal/AlertModal";

const findNextUnusedPlanName = (plans: Partial<Plan>[]) => {
  if (plans.length === 0) {
    return "Plan #1";
  }

  const usedNames = plans.map((plan) => plan.name).filter((name) => name?.match(/^Plan #\d+$/));
  const usedNameNumbers = usedNames.map((name) => Number(name?.replace(/^Plan #/, "")));
  return `Plan #${Math.max(...usedNameNumbers) + 1}`;
};

export default function PlanDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<number | null>(null);
  const { loading, error, data, refetch } = useGetPlansQuery();
  const [deletePlan] = useDeletePlanMutation();
  const [createPlan, { loading: createLoading, error: createError }] = useCreatePlanMutation();
  const router = useRouter();

  function closeDeleteModal() {
    // We need the name to remain set for the transition time of the modal
    setTimeout(() => setPlanToDelete(null), 300);
    setIsOpen(false);
  }

  function openDeleteModal(id: number) {
    setPlanToDelete(id);
    setIsOpen(true);
  }

  const handleCreatePlan = async () => {
    const result = await createPlan({
      variables: {
        input: {
          name: findNextUnusedPlanName(data?.plans ?? []),
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
        },
      },
    });
    if (result.data?.createPlan?.id) {
      void router.push(`/plans/${result.data.createPlan.id}/edit`);
    } else {
      // TODO: figure out error handling here
      // eslint-disable-next-line no-console
      console.error(result);
    }
  };

  const handleDeletePlan = async () => {
    if (planToDelete) {
      await deletePlan({
        variables: {
          planId: planToDelete,
        },
      });
      await refetch();
    }

    closeDeleteModal();
  };

  if (loading) {
    return <LoadingScreen message="Loading plans..." />;
  }

  if (error) {
    return <div>Error!</div>;
  }

  if (!data?.plans.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <h1 className="mb-4 text-xl leading-6 font-medium text-gray-700">Get started by creating your first plan!</h1>
        <Button onClick={handleCreatePlan}>Create meal plan</Button>
      </div>
    );
  }

  return (
    <>
      <AlertModal
        open={isOpen}
        title="Delete plan"
        onConfirm={handleDeletePlan}
        confirmText="Delete"
        onClose={closeDeleteModal}
      >
        <p>
          Are you sure you want to delete{" "}
          <span className="font-medium">{data.plans.find((plan) => plan.id === planToDelete)?.name}</span>?
        </p>
      </AlertModal>
      <div className="px-8 h-full">
        <header className="flex w-full justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-700">Plans</h1>
          </div>
          <Button onClick={handleCreatePlan}>Create meal plan</Button>
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
                      <div className=" flex flex-grow items-center justify-between">
                        <div className="flex">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              openDeleteModal(plan.id);
                            }}
                            className="h-10 w-10 inline-flex align-center self-center items-center justify-center border border-transparent rounded-full shadow-sm text-gray-400  hover:bg-red-100 focus:outline-none mr-4"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                          <div className="truncate">
                            <div className="flex text-sm">
                              <p className="font-medium text-blue-600 truncate">{plan.name}</p>
                            </div>
                            <div className="mt-2 flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <p>Updated {formatDistanceToNow(new Date(plan.updatedAt))} ago</p>
                              </div>
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
    </>
  );
}
