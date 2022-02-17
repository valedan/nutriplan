import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
};

export type AddIngredientInput = {
  foodId: Scalars['Int'];
  planId?: Maybe<Scalars['Int']>;
  recipeId?: Maybe<Scalars['Int']>;
};

export type AddMealInput = {
  planId: Scalars['Int'];
  recipeId: Scalars['Int'];
};

export type CreatePlanInput = {
  endDate: Scalars['DateTime'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type CreateRecipeInput = {
  name: Scalars['String'];
  servings: Scalars['Int'];
};

export type Food = {
  __typename?: 'Food';
  brandName?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  dataSource: Scalars['String'];
  description: Scalars['String'];
  foodNutrients: Array<FoodNutrient>;
  id: Scalars['Int'];
  nutrientCount: Scalars['Int'];
  portions: Array<Portion>;
  searchScore?: Maybe<Scalars['Float']>;
};


export type FoodFoodNutrientsArgs = {
  nutrientIds?: Maybe<Array<Scalars['Int']>>;
};

export type FoodNutrient = {
  __typename?: 'FoodNutrient';
  amount: Scalars['Float'];
  id: Scalars['Int'];
  nutrient: Nutrient;
};

export type Ingredient = {
  __typename?: 'Ingredient';
  amount: Scalars['Float'];
  food: Food;
  id: Scalars['Int'];
  measure: Scalars['String'];
  order: Scalars['Int'];
};

export enum IngredientParent {
  Plan = 'plan',
  Recipe = 'recipe'
}

export type IngredientReorder = {
  id: Scalars['Int'];
  newOrder: Scalars['Int'];
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['Int'];
  ingredients: Array<Ingredient>;
  order: Scalars['Int'];
  plan?: Maybe<Plan>;
  recipe?: Maybe<Recipe>;
  servings: Scalars['Int'];
};

export type MealReorder = {
  id: Scalars['Int'];
  newOrder: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addIngredient?: Maybe<Ingredient>;
  addMeal?: Maybe<Meal>;
  createPlan?: Maybe<Plan>;
  createRecipe?: Maybe<Recipe>;
  deletePlan?: Maybe<Plan>;
  deleteRecipe?: Maybe<Recipe>;
  removeIngredient?: Maybe<Ingredient>;
  removeMeal?: Maybe<Meal>;
  reorderIngredients?: Maybe<Array<Maybe<Ingredient>>>;
  reorderMeals?: Maybe<Array<Maybe<Meal>>>;
  updateIngredient?: Maybe<Ingredient>;
  updateMeal?: Maybe<Meal>;
  updatePlan?: Maybe<Plan>;
  updateRecipe?: Maybe<Recipe>;
  updateTarget?: Maybe<NutrientTarget>;
};


export type MutationAddIngredientArgs = {
  input: AddIngredientInput;
};


export type MutationAddMealArgs = {
  input: AddMealInput;
};


export type MutationCreatePlanArgs = {
  input: CreatePlanInput;
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};


export type MutationDeletePlanArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveIngredientArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveMealArgs = {
  id: Scalars['Int'];
};


export type MutationReorderIngredientsArgs = {
  input: ReorderIngredientsInput;
};


export type MutationReorderMealsArgs = {
  input: ReorderMealsInput;
};


export type MutationUpdateIngredientArgs = {
  input: UpdateIngredientInput;
};


export type MutationUpdateMealArgs = {
  input: UpdateMealInput;
};


export type MutationUpdatePlanArgs = {
  input: UpdatePlanInput;
};


export type MutationUpdateRecipeArgs = {
  input: UpdateRecipeInput;
};


export type MutationUpdateTargetArgs = {
  input: UpdateTargetInput;
};

export type Nutrient = {
  __typename?: 'Nutrient';
  activeTarget?: Maybe<NutrientTarget>;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  unit: Scalars['String'];
};

export type NutrientGroup = {
  __typename?: 'NutrientGroup';
  id: Scalars['Int'];
  name: Scalars['String'];
  nutrients: Array<Nutrient>;
  order: Scalars['Int'];
};

export type NutrientProfile = {
  __typename?: 'NutrientProfile';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  nutrientTargets: Array<NutrientTarget>;
  updatedAt: Scalars['String'];
};

export type NutrientTarget = {
  __typename?: 'NutrientTarget';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nutrient: Nutrient;
  updatedAt: Scalars['String'];
};

export type Plan = {
  __typename?: 'Plan';
  createdAt: Scalars['String'];
  endDate: Scalars['String'];
  id: Scalars['Int'];
  ingredients: Array<Ingredient>;
  meals: Array<Meal>;
  name?: Maybe<Scalars['String']>;
  startDate: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Portion = {
  __typename?: 'Portion';
  gramWeight: Scalars['Float'];
  measure: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  activeNutrientProfile: NutrientProfile;
  food?: Maybe<Food>;
  foods: Array<Food>;
  nutrient?: Maybe<Nutrient>;
  nutrientGroups: Array<NutrientGroup>;
  nutrients: Array<Nutrient>;
  plan?: Maybe<Plan>;
  plans: Array<Plan>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  searchFoods?: Maybe<Array<Maybe<Food>>>;
};


export type QueryFoodArgs = {
  id: Scalars['Int'];
};


export type QueryFoodsArgs = {
  ids: Array<Scalars['Int']>;
};


export type QueryNutrientArgs = {
  id: Scalars['Int'];
};


export type QueryNutrientsArgs = {
  ids?: Maybe<Array<Scalars['Int']>>;
};


export type QueryPlanArgs = {
  id: Scalars['Int'];
};


export type QueryRecipeArgs = {
  id: Scalars['Int'];
};


export type QuerySearchFoodsArgs = {
  searchTerm: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  ingredients: Array<Ingredient>;
  meals: Array<Meal>;
  name?: Maybe<Scalars['String']>;
  servings?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
};

export type ReorderIngredientsInput = {
  parentId: Scalars['Int'];
  parentType: IngredientParent;
  reorders: Array<IngredientReorder>;
};

export type ReorderMealsInput = {
  parentId: Scalars['Int'];
  reorders: Array<MealReorder>;
};

export type ServingSize = {
  __typename?: 'ServingSize';
  amount: Scalars['Float'];
  description: Scalars['String'];
  unit: ServingSizeUnit;
};

export enum ServingSizeUnit {
  G = 'g',
  Ml = 'ml'
}

export type UpdateIngredientInput = {
  amount?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  measure?: Maybe<Scalars['String']>;
};

export type UpdateMealInput = {
  id: Scalars['Int'];
  servings?: Maybe<Scalars['Int']>;
};

export type UpdatePlanInput = {
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export type UpdateRecipeInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  servings?: Maybe<Scalars['Int']>;
};

export type UpdateTargetInput = {
  id: Scalars['Int'];
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
};

export type GetNutrientQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetNutrientQuery = { __typename?: 'Query', nutrient?: Maybe<{ __typename?: 'Nutrient', id: number, name: string, unit: string, order?: Maybe<number>, displayName?: Maybe<string>, activeTarget?: Maybe<{ __typename?: 'NutrientTarget', id: number, min?: Maybe<number>, max?: Maybe<number> }> }> };

export type GetNutrientGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNutrientGroupsQuery = { __typename?: 'Query', nutrientGroups: Array<{ __typename?: 'NutrientGroup', id: number, name: string, order: number, nutrients: Array<{ __typename?: 'Nutrient', id: number, name: string, unit: string, order?: Maybe<number>, displayName?: Maybe<string>, activeTarget?: Maybe<{ __typename?: 'NutrientTarget', id: number, min?: Maybe<number>, max?: Maybe<number> }> }> }> };

export type AddMealMutationVariables = Exact<{
  input: AddMealInput;
}>;


export type AddMealMutation = { __typename?: 'Mutation', addMeal?: Maybe<{ __typename?: 'Meal', id: number, servings: number, order: number, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, food: { __typename?: 'Food', id: number, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> } }> }> };

export type GetActiveProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveProfileQuery = { __typename?: 'Query', activeNutrientProfile: { __typename?: 'NutrientProfile', id: number, name: string, isActive: boolean, nutrientTargets: Array<{ __typename?: 'NutrientTarget', id: number, min?: Maybe<number>, max?: Maybe<number>, nutrient: { __typename?: 'Nutrient', id: number, name: string } }> } };

export type GetPlanWithNutrientsQueryVariables = Exact<{
  planId: Scalars['Int'];
  nutrientIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type GetPlanWithNutrientsQuery = { __typename?: 'Query', plan?: Maybe<{ __typename?: 'Plan', id: number, startDate: string, endDate: string, name?: Maybe<string>, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }>, foodNutrients: Array<{ __typename?: 'FoodNutrient', id: number, amount: number, nutrient: { __typename?: 'Nutrient', id: number, name: string, unit: string } }> } }>, meals: Array<{ __typename?: 'Meal', id: number, servings: number, order: number, recipe?: Maybe<{ __typename?: 'Recipe', name?: Maybe<string>, id: number }>, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }>, foodNutrients: Array<{ __typename?: 'FoodNutrient', id: number, amount: number, nutrient: { __typename?: 'Nutrient', id: number, name: string, unit: string } }> } }> }> }> };

export type RemoveMealMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveMealMutation = { __typename?: 'Mutation', removeMeal?: Maybe<{ __typename?: 'Meal', id: number }> };

export type CreateRecipeMutationVariables = Exact<{
  input: CreateRecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe?: Maybe<{ __typename?: 'Recipe', id: number, name?: Maybe<string>, servings?: Maybe<number> }> };

export type DeleteRecipeMutationVariables = Exact<{
  recipeId: Scalars['Int'];
}>;


export type DeleteRecipeMutation = { __typename?: 'Mutation', deleteRecipe?: Maybe<{ __typename?: 'Recipe', id: number }> };

export type GetRecipeQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', recipe?: Maybe<{ __typename?: 'Recipe', name?: Maybe<string>, servings?: Maybe<number>, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> } }> }> };

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: number, name?: Maybe<string>, servings?: Maybe<number>, createdAt: string, updatedAt: string }> };

export type UpdateRecipeMutationVariables = Exact<{
  input: UpdateRecipeInput;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe?: Maybe<{ __typename?: 'Recipe', id: number, name?: Maybe<string>, servings?: Maybe<number> }> };

export type AddIngredientMutationVariables = Exact<{
  input: AddIngredientInput;
}>;


export type AddIngredientMutation = { __typename?: 'Mutation', addIngredient?: Maybe<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> } }> };

export type CreatePlanMutationVariables = Exact<{
  input: CreatePlanInput;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan?: Maybe<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate: string, endDate: string }> };

export type DeletePlanMutationVariables = Exact<{
  planId: Scalars['Int'];
}>;


export type DeletePlanMutation = { __typename?: 'Mutation', deletePlan?: Maybe<{ __typename?: 'Plan', id: number }> };

export type GetFoodQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetFoodQuery = { __typename?: 'Query', food?: Maybe<{ __typename?: 'Food', id: number, description: string, brandName?: Maybe<string> }> };

export type GetFoodsWithNutrientsQueryVariables = Exact<{
  foodIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type GetFoodsWithNutrientsQuery = { __typename?: 'Query', foods: Array<{ __typename?: 'Food', id: number, description: string, foodNutrients: Array<{ __typename?: 'FoodNutrient', id: number, amount: number, nutrient: { __typename?: 'Nutrient', id: number, name: string, unit: string } }> }> };

export type GetNutrientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNutrientsQuery = { __typename?: 'Query', nutrients: Array<{ __typename?: 'Nutrient', id: number, name: string, unit: string }> };

export type GetPlanQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPlanQuery = { __typename?: 'Query', plan?: Maybe<{ __typename?: 'Plan', name?: Maybe<string>, startDate: string, endDate: string, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> } }>, meals: Array<{ __typename?: 'Meal', id: number, servings: number, order: number, recipe?: Maybe<{ __typename?: 'Recipe', name?: Maybe<string>, id: number }>, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> } }> }> }> };

export type GetPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlansQuery = { __typename?: 'Query', plans: Array<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate: string, endDate: string, createdAt: string, updatedAt: string }> };

export type RemoveIngredientMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveIngredientMutation = { __typename?: 'Mutation', removeIngredient?: Maybe<{ __typename?: 'Ingredient', id: number }> };

export type SearchFoodsQueryVariables = Exact<{
  searchTerm: Scalars['String'];
}>;


export type SearchFoodsQuery = { __typename?: 'Query', searchFoods?: Maybe<Array<Maybe<{ __typename?: 'Food', description: string, id: number, dataSource: string, category?: Maybe<string>, brandName?: Maybe<string>, searchScore?: Maybe<number>, nutrientCount: number }>>> };

export type UpdateIngredientMutationVariables = Exact<{
  input: UpdateIngredientInput;
}>;


export type UpdateIngredientMutation = { __typename?: 'Mutation', updateIngredient?: Maybe<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number }> };

export type UpdatePlanMutationVariables = Exact<{
  input: UpdatePlanInput;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan?: Maybe<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate: string, endDate: string }> };


export const GetNutrientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNutrient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nutrient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"activeTarget"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}}]}}]}}]} as unknown as DocumentNode<GetNutrientQuery, GetNutrientQueryVariables>;
export const GetNutrientGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNutrientGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nutrientGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"nutrients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"activeTarget"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNutrientGroupsQuery, GetNutrientGroupsQueryVariables>;
export const AddMealDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addMeal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddMealInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMeal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"food"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"portions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"gramWeight"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddMealMutation, AddMealMutationVariables>;
export const GetActiveProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActiveProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeNutrientProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"nutrientTargets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"nutrient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetActiveProfileQuery, GetActiveProfileQueryVariables>;
export const GetPlanWithNutrientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlanWithNutrients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nutrientIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"food"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"portions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"gramWeight"}}]}},{"kind":"Field","name":{"kind":"Name","value":"foodNutrients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nutrientIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nutrientIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"nutrient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"food"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"portions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"gramWeight"}}]}},{"kind":"Field","name":{"kind":"Name","value":"foodNutrients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nutrientIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nutrientIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"nutrient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPlanWithNutrientsQuery, GetPlanWithNutrientsQueryVariables>;
export const RemoveMealDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeMeal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMeal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveMealMutation, RemoveMealMutationVariables>;
export const CreateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}}]}}]}}]} as unknown as DocumentNode<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const DeleteRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const GetRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"food"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"portions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"gramWeight"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeQuery, GetRecipeQueryVariables>;
export const GetRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRecipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetRecipesQuery, GetRecipesQueryVariables>;
export const UpdateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRecipeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const AddIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddIngredientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"food"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"portions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"gramWeight"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddIngredientMutation, AddIngredientMutationVariables>;
export const CreatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>;
export const DeletePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeletePlanMutation, DeletePlanMutationVariables>;
export const GetFoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"food"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brandName"}}]}}]}}]} as unknown as DocumentNode<GetFoodQuery, GetFoodQueryVariables>;
export const GetFoodsWithNutrientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFoodsWithNutrients"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"foodIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"foods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"foodIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"foodNutrients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"nutrient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFoodsWithNutrientsQuery, GetFoodsWithNutrientsQueryVariables>;
export const GetNutrientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNutrients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nutrients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]} as unknown as DocumentNode<GetNutrientsQuery, GetNutrientsQueryVariables>;
export const GetPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"food"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"portions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"gramWeight"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"meals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"food"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"portions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"gramWeight"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPlanQuery, GetPlanQueryVariables>;
export const GetPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetPlansQuery, GetPlansQueryVariables>;
export const RemoveIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveIngredientMutation, RemoveIngredientMutationVariables>;
export const SearchFoodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchFoods"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchFoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dataSource"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"brandName"}},{"kind":"Field","name":{"kind":"Name","value":"searchScore"}},{"kind":"Field","name":{"kind":"Name","value":"nutrientCount"}}]}}]}}]} as unknown as DocumentNode<SearchFoodsQuery, SearchFoodsQueryVariables>;
export const UpdateIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateIngredientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIngredient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"measure"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]} as unknown as DocumentNode<UpdateIngredientMutation, UpdateIngredientMutationVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>;