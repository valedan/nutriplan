import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, LoadingScreen, Card, Heading, NavHeading } from "components";
import { useGetPlanWithNutrientsQuery } from "generated/graphql/hooks";
import PlanNameInput from "./components/PlanNameInput/PlanNameInput";
import PlanDateInput from "./components/PlanDateInput/PlanDateInput";
import NutrientList from "../../NutrientList/NutrientList";
import AddFoodModal from "./components/AddFood/AddFoodModal";
import IngredientList from "./components/IngredientList/IngredientList";
import { PlanContext } from "./PlanContext";

export default function PlanEditor() {
  const router = useRouter();
  const { id: planId } = router.query;
  const { data, loading, error, refetch } = useGetPlanWithNutrientsQuery({
    variables: { planId: Number(planId) },
  });

  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  if (loading) {
    return <LoadingScreen />;
  }

  // TODO: user-friendly error handling and/or retries
  if (error || !planId) return <p>Error :(</p>;

  return (
    <PlanContext.Provider value={{ id: Number(planId), refetch }}>
      <div className="  flex flex-col">
        <Head>
          {/* TODO: This is stale after updating */}
          <title key="title">Edit {data?.plan?.name || "plan"}</title>
        </Head>
        {isAddFoodOpen && (
          // TODO: stop using refetch everywhere and start using cache
          <AddFoodModal onClose={() => setIsAddFoodOpen(false)} />
        )}

        <div className="flex my-2 px-4">
          <NavHeading to="/">Edit meal plan</NavHeading>
        </div>
        <Card className="py-4 px-8 justify-between mb-4 rounded-none">
          <Card.Content className="justify-between py-2">
            <PlanNameInput className="w-2/3" />
            <PlanDateInput />
          </Card.Content>
        </Card>
        <div className="flex px-2">
          <Card className="flex-col w-2/3 mr-4 h-full">
            <Card.Header className="justify-between mt-2">
              <Heading>Foods</Heading>
              <Button onClick={() => setIsAddFoodOpen(true)}>Add Food</Button>
            </Card.Header>
            <Card.Content>
              <IngredientList />
            </Card.Content>
          </Card>

          <Card className="flex-col w-1/3">
            <Card.Header>
              <Heading>Average daily nutrients</Heading>
            </Card.Header>
            <Card.Content>
              <NutrientList />
            </Card.Content>
          </Card>
        </div>
      </div>
    </PlanContext.Provider>
  );
}
