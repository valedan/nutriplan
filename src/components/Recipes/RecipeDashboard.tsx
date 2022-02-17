import React, { useState } from "react";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/outline";
import { formatDistanceToNow } from "date-fns";
import {
  Recipe,
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
  useGetRecipesQuery,
} from "../../generated/graphql/hooks";
import { Button, LoadingScreen } from "../shared";
import AlertModal from "../shared/Modal/AlertModal";

const findNextUnusedRecipeName = (recipes: Partial<Recipe>[]) => {
  if (recipes.length === 0) {
    return "Recipe #1";
  }

  const usedNames = recipes.map((recipe) => recipe.name).filter((name) => name?.match(/^Recipe #\d+$/));
  const usedNameNumbers = usedNames.map((name) => Number(name?.replace(/^Recipe #/, "")));
  return `Recipe #${Math.max(...usedNameNumbers) + 1}`;
};

export default function RecipeDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null);
  const { loading, error, data, refetch } = useGetRecipesQuery();
  const [deleteRecipe] = useDeleteRecipeMutation();
  const [createRecipe] = useCreateRecipeMutation();
  const router = useRouter();

  function closeDeleteModal() {
    // We need the name to remain set for the transition time of the modal
    setTimeout(() => setRecipeToDelete(null), 300);
    setIsOpen(false);
  }

  function openDeleteModal(id: number) {
    setRecipeToDelete(id);
    setIsOpen(true);
  }

  const handleCreateRecipe = async () => {
    const result = await createRecipe({
      variables: {
        input: {
          name: findNextUnusedRecipeName(data?.recipes ?? []),
          servings: 1,
        },
      },
    });
    if (result.data?.createRecipe?.id) {
      void router.push(`/recipes/${result.data.createRecipe.id}/edit`);
    } else {
      // TODO: figure out error handling here
      // eslint-disable-next-line no-console
      console.error(result);
    }
  };

  const handleDeleteRecipe = async () => {
    if (recipeToDelete) {
      await deleteRecipe({
        variables: {
          recipeId: recipeToDelete,
        },
      });
      await refetch();
    }

    closeDeleteModal();
  };

  if (loading) {
    return <LoadingScreen message="Loading recipes..." />;
  }

  if (error) {
    return <div>Error!</div>;
  }

  if (!data?.recipes.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <h1 className="mb-4 text-xl leading-6 font-medium text-gray-700">Get started by creating your first recipe!</h1>
        <Button onClick={handleCreateRecipe}>Create recipe</Button>
      </div>
    );
  }

  return (
    <>
      <AlertModal
        open={isOpen}
        title="Delete recipe"
        onConfirm={handleDeleteRecipe}
        confirmText="Delete"
        onClose={closeDeleteModal}
      >
        <p>
          Are you sure you want to delete{" "}
          <span className="font-medium">{data.recipes.find((recipe) => recipe.id === recipeToDelete)?.name}</span>?
        </p>
      </AlertModal>
      <div className="px-8 h-full">
        <header className="flex w-full justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-700">Recipes</h1>
          </div>
          <Button onClick={handleCreateRecipe}>Create recipe</Button>
        </header>
        <div>
          <ul className="flex flex-col gap-2">
            {/* sort mutates the array  */}
            {[...data.recipes]
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .map((recipe) => (
                <li key={recipe.id}>
                  <a
                    // TODO: either this should go to the recipe viewer, or the editor should be presentable for read-only interactions
                    href={`/recipes/${recipe.id}/edit`}
                    className="block hover:bg-gray-50 bg-white shadow overflow-hidden sm:rounded-md"
                  >
                    <div className="px-4 py-4 flex items-center sm:px-6">
                      <div className=" flex flex-grow items-center justify-between">
                        <div className="flex">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              openDeleteModal(recipe.id);
                            }}
                            className="h-10 w-10 inline-flex align-center self-center items-center justify-center border border-transparent rounded-full shadow-sm text-gray-400  hover:bg-red-100 focus:outline-none mr-4"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                          <div className="truncate">
                            <div className="flex text-sm">
                              <p className="font-medium text-blue-600 truncate">{recipe.name}</p>
                            </div>
                            <div className="mt-2 flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <p>Updated {formatDistanceToNow(new Date(recipe.updatedAt))} ago</p>
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
