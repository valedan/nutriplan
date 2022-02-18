import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  nutrientTargets: Array<NutrientTarget>;
  updatedAt: Scalars['DateTime'];
};

export type NutrientTarget = {
  __typename?: 'NutrientTarget';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  nutrient: Nutrient;
  updatedAt: Scalars['DateTime'];
};

export type Plan = {
  __typename?: 'Plan';
  createdAt: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  id: Scalars['Int'];
  ingredients: Array<Ingredient>;
  meals: Array<Meal>;
  name?: Maybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  ingredients: Array<Ingredient>;
  meals: Array<Meal>;
  name?: Maybe<Scalars['String']>;
  servings?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
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


export type GetPlanWithNutrientsQuery = { __typename?: 'Query', plan?: Maybe<{ __typename?: 'Plan', id: number, startDate: Date, endDate: Date, name?: Maybe<string>, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }>, foodNutrients: Array<{ __typename?: 'FoodNutrient', id: number, amount: number, nutrient: { __typename?: 'Nutrient', id: number, name: string, unit: string } }> } }>, meals: Array<{ __typename?: 'Meal', id: number, servings: number, order: number, recipe?: Maybe<{ __typename?: 'Recipe', name?: Maybe<string>, id: number }>, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }>, foodNutrients: Array<{ __typename?: 'FoodNutrient', id: number, amount: number, nutrient: { __typename?: 'Nutrient', id: number, name: string, unit: string } }> } }> }> }> };

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


export type GetRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: number, name?: Maybe<string>, servings?: Maybe<number>, createdAt: Date, updatedAt: Date }> };

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


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan?: Maybe<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate: Date, endDate: Date }> };

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


export type GetPlanQuery = { __typename?: 'Query', plan?: Maybe<{ __typename?: 'Plan', name?: Maybe<string>, startDate: Date, endDate: Date, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> } }>, meals: Array<{ __typename?: 'Meal', id: number, servings: number, order: number, recipe?: Maybe<{ __typename?: 'Recipe', name?: Maybe<string>, id: number }>, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food: { __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> } }> }> }> };

export type GetPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlansQuery = { __typename?: 'Query', plans: Array<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate: Date, endDate: Date, createdAt: Date, updatedAt: Date }> };

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


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan?: Maybe<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate: Date, endDate: Date }> };


export const GetNutrientDocument = gql`
    query getNutrient($id: Int!) {
  nutrient(id: $id) {
    id
    name
    unit
    order
    displayName
    activeTarget {
      id
      min
      max
    }
  }
}
    `;

/**
 * __useGetNutrientQuery__
 *
 * To run a query within a React component, call `useGetNutrientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNutrientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNutrientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNutrientQuery(baseOptions: Apollo.QueryHookOptions<GetNutrientQuery, GetNutrientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNutrientQuery, GetNutrientQueryVariables>(GetNutrientDocument, options);
      }
export function useGetNutrientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNutrientQuery, GetNutrientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNutrientQuery, GetNutrientQueryVariables>(GetNutrientDocument, options);
        }
export type GetNutrientQueryHookResult = ReturnType<typeof useGetNutrientQuery>;
export type GetNutrientLazyQueryHookResult = ReturnType<typeof useGetNutrientLazyQuery>;
export type GetNutrientQueryResult = Apollo.QueryResult<GetNutrientQuery, GetNutrientQueryVariables>;
export const GetNutrientGroupsDocument = gql`
    query getNutrientGroups {
  nutrientGroups {
    id
    name
    order
    nutrients {
      id
      name
      unit
      order
      displayName
      activeTarget {
        id
        min
        max
      }
    }
  }
}
    `;

/**
 * __useGetNutrientGroupsQuery__
 *
 * To run a query within a React component, call `useGetNutrientGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNutrientGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNutrientGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNutrientGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetNutrientGroupsQuery, GetNutrientGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNutrientGroupsQuery, GetNutrientGroupsQueryVariables>(GetNutrientGroupsDocument, options);
      }
export function useGetNutrientGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNutrientGroupsQuery, GetNutrientGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNutrientGroupsQuery, GetNutrientGroupsQueryVariables>(GetNutrientGroupsDocument, options);
        }
export type GetNutrientGroupsQueryHookResult = ReturnType<typeof useGetNutrientGroupsQuery>;
export type GetNutrientGroupsLazyQueryHookResult = ReturnType<typeof useGetNutrientGroupsLazyQuery>;
export type GetNutrientGroupsQueryResult = Apollo.QueryResult<GetNutrientGroupsQuery, GetNutrientGroupsQueryVariables>;
export const AddMealDocument = gql`
    mutation addMeal($input: AddMealInput!) {
  addMeal(input: $input) {
    id
    servings
    order
    ingredients {
      id
      amount
      measure
      food {
        id
        portions {
          measure
          gramWeight
        }
      }
    }
  }
}
    `;
export type AddMealMutationFn = Apollo.MutationFunction<AddMealMutation, AddMealMutationVariables>;

/**
 * __useAddMealMutation__
 *
 * To run a mutation, you first call `useAddMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMealMutation, { data, loading, error }] = useAddMealMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMealMutation(baseOptions?: Apollo.MutationHookOptions<AddMealMutation, AddMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMealMutation, AddMealMutationVariables>(AddMealDocument, options);
      }
export type AddMealMutationHookResult = ReturnType<typeof useAddMealMutation>;
export type AddMealMutationResult = Apollo.MutationResult<AddMealMutation>;
export type AddMealMutationOptions = Apollo.BaseMutationOptions<AddMealMutation, AddMealMutationVariables>;
export const GetActiveProfileDocument = gql`
    query getActiveProfile {
  activeNutrientProfile {
    id
    name
    isActive
    nutrientTargets {
      id
      min
      max
      nutrient {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetActiveProfileQuery__
 *
 * To run a query within a React component, call `useGetActiveProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveProfileQuery, GetActiveProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveProfileQuery, GetActiveProfileQueryVariables>(GetActiveProfileDocument, options);
      }
export function useGetActiveProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveProfileQuery, GetActiveProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveProfileQuery, GetActiveProfileQueryVariables>(GetActiveProfileDocument, options);
        }
export type GetActiveProfileQueryHookResult = ReturnType<typeof useGetActiveProfileQuery>;
export type GetActiveProfileLazyQueryHookResult = ReturnType<typeof useGetActiveProfileLazyQuery>;
export type GetActiveProfileQueryResult = Apollo.QueryResult<GetActiveProfileQuery, GetActiveProfileQueryVariables>;
export const GetPlanWithNutrientsDocument = gql`
    query getPlanWithNutrients($planId: Int!, $nutrientIds: [Int!]) {
  plan(id: $planId) {
    id
    startDate
    endDate
    name
    ingredients {
      id
      amount
      measure
      order
      food {
        id
        description
        portions {
          measure
          gramWeight
        }
        foodNutrients(nutrientIds: $nutrientIds) {
          id
          amount
          nutrient {
            id
            name
            unit
          }
        }
      }
    }
    meals {
      id
      servings
      order
      recipe {
        name
        id
      }
      ingredients {
        id
        amount
        measure
        order
        food {
          id
          description
          portions {
            measure
            gramWeight
          }
          foodNutrients(nutrientIds: $nutrientIds) {
            id
            amount
            nutrient {
              id
              name
              unit
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetPlanWithNutrientsQuery__
 *
 * To run a query within a React component, call `useGetPlanWithNutrientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanWithNutrientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanWithNutrientsQuery({
 *   variables: {
 *      planId: // value for 'planId'
 *      nutrientIds: // value for 'nutrientIds'
 *   },
 * });
 */
export function useGetPlanWithNutrientsQuery(baseOptions: Apollo.QueryHookOptions<GetPlanWithNutrientsQuery, GetPlanWithNutrientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlanWithNutrientsQuery, GetPlanWithNutrientsQueryVariables>(GetPlanWithNutrientsDocument, options);
      }
export function useGetPlanWithNutrientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlanWithNutrientsQuery, GetPlanWithNutrientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlanWithNutrientsQuery, GetPlanWithNutrientsQueryVariables>(GetPlanWithNutrientsDocument, options);
        }
export type GetPlanWithNutrientsQueryHookResult = ReturnType<typeof useGetPlanWithNutrientsQuery>;
export type GetPlanWithNutrientsLazyQueryHookResult = ReturnType<typeof useGetPlanWithNutrientsLazyQuery>;
export type GetPlanWithNutrientsQueryResult = Apollo.QueryResult<GetPlanWithNutrientsQuery, GetPlanWithNutrientsQueryVariables>;
export const RemoveMealDocument = gql`
    mutation removeMeal($id: Int!) {
  removeMeal(id: $id) {
    id
  }
}
    `;
export type RemoveMealMutationFn = Apollo.MutationFunction<RemoveMealMutation, RemoveMealMutationVariables>;

/**
 * __useRemoveMealMutation__
 *
 * To run a mutation, you first call `useRemoveMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMealMutation, { data, loading, error }] = useRemoveMealMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveMealMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMealMutation, RemoveMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMealMutation, RemoveMealMutationVariables>(RemoveMealDocument, options);
      }
export type RemoveMealMutationHookResult = ReturnType<typeof useRemoveMealMutation>;
export type RemoveMealMutationResult = Apollo.MutationResult<RemoveMealMutation>;
export type RemoveMealMutationOptions = Apollo.BaseMutationOptions<RemoveMealMutation, RemoveMealMutationVariables>;
export const CreateRecipeDocument = gql`
    mutation createRecipe($input: CreateRecipeInput!) {
  createRecipe(input: $input) {
    id
    name
    servings
  }
}
    `;
export type CreateRecipeMutationFn = Apollo.MutationFunction<CreateRecipeMutation, CreateRecipeMutationVariables>;

/**
 * __useCreateRecipeMutation__
 *
 * To run a mutation, you first call `useCreateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecipeMutation, { data, loading, error }] = useCreateRecipeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecipeMutation, CreateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument, options);
      }
export type CreateRecipeMutationHookResult = ReturnType<typeof useCreateRecipeMutation>;
export type CreateRecipeMutationResult = Apollo.MutationResult<CreateRecipeMutation>;
export type CreateRecipeMutationOptions = Apollo.BaseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const DeleteRecipeDocument = gql`
    mutation deleteRecipe($recipeId: Int!) {
  deleteRecipe(id: $recipeId) {
    id
  }
}
    `;
export type DeleteRecipeMutationFn = Apollo.MutationFunction<DeleteRecipeMutation, DeleteRecipeMutationVariables>;

/**
 * __useDeleteRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeMutation, { data, loading, error }] = useDeleteRecipeMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useDeleteRecipeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument, options);
      }
export type DeleteRecipeMutationHookResult = ReturnType<typeof useDeleteRecipeMutation>;
export type DeleteRecipeMutationResult = Apollo.MutationResult<DeleteRecipeMutation>;
export type DeleteRecipeMutationOptions = Apollo.BaseMutationOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const GetRecipeDocument = gql`
    query getRecipe($id: Int!) {
  recipe(id: $id) {
    name
    servings
    ingredients {
      id
      amount
      measure
      order
      food {
        id
        description
        portions {
          measure
          gramWeight
        }
      }
    }
  }
}
    `;

/**
 * __useGetRecipeQuery__
 *
 * To run a query within a React component, call `useGetRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRecipeQuery(baseOptions: Apollo.QueryHookOptions<GetRecipeQuery, GetRecipeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeQuery, GetRecipeQueryVariables>(GetRecipeDocument, options);
      }
export function useGetRecipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeQuery, GetRecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeQuery, GetRecipeQueryVariables>(GetRecipeDocument, options);
        }
export type GetRecipeQueryHookResult = ReturnType<typeof useGetRecipeQuery>;
export type GetRecipeLazyQueryHookResult = ReturnType<typeof useGetRecipeLazyQuery>;
export type GetRecipeQueryResult = Apollo.QueryResult<GetRecipeQuery, GetRecipeQueryVariables>;
export const GetRecipesDocument = gql`
    query getRecipes {
  recipes {
    id
    name
    servings
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetRecipesQuery__
 *
 * To run a query within a React component, call `useGetRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
      }
export function useGetRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export type GetRecipesQueryHookResult = ReturnType<typeof useGetRecipesQuery>;
export type GetRecipesLazyQueryHookResult = ReturnType<typeof useGetRecipesLazyQuery>;
export type GetRecipesQueryResult = Apollo.QueryResult<GetRecipesQuery, GetRecipesQueryVariables>;
export const UpdateRecipeDocument = gql`
    mutation updateRecipe($input: UpdateRecipeInput!) {
  updateRecipe(input: $input) {
    id
    name
    servings
  }
}
    `;
export type UpdateRecipeMutationFn = Apollo.MutationFunction<UpdateRecipeMutation, UpdateRecipeMutationVariables>;

/**
 * __useUpdateRecipeMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeMutation, { data, loading, error }] = useUpdateRecipeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument, options);
      }
export type UpdateRecipeMutationHookResult = ReturnType<typeof useUpdateRecipeMutation>;
export type UpdateRecipeMutationResult = Apollo.MutationResult<UpdateRecipeMutation>;
export type UpdateRecipeMutationOptions = Apollo.BaseMutationOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const AddIngredientDocument = gql`
    mutation addIngredient($input: AddIngredientInput!) {
  addIngredient(input: $input) {
    id
    amount
    measure
    order
    food {
      id
      portions {
        measure
        gramWeight
      }
    }
  }
}
    `;
export type AddIngredientMutationFn = Apollo.MutationFunction<AddIngredientMutation, AddIngredientMutationVariables>;

/**
 * __useAddIngredientMutation__
 *
 * To run a mutation, you first call `useAddIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addIngredientMutation, { data, loading, error }] = useAddIngredientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddIngredientMutation(baseOptions?: Apollo.MutationHookOptions<AddIngredientMutation, AddIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddIngredientMutation, AddIngredientMutationVariables>(AddIngredientDocument, options);
      }
export type AddIngredientMutationHookResult = ReturnType<typeof useAddIngredientMutation>;
export type AddIngredientMutationResult = Apollo.MutationResult<AddIngredientMutation>;
export type AddIngredientMutationOptions = Apollo.BaseMutationOptions<AddIngredientMutation, AddIngredientMutationVariables>;
export const CreatePlanDocument = gql`
    mutation createPlan($input: CreatePlanInput!) {
  createPlan(input: $input) {
    id
    name
    startDate
    endDate
  }
}
    `;
export type CreatePlanMutationFn = Apollo.MutationFunction<CreatePlanMutation, CreatePlanMutationVariables>;

/**
 * __useCreatePlanMutation__
 *
 * To run a mutation, you first call `useCreatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanMutation, { data, loading, error }] = useCreatePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlanMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlanMutation, CreatePlanMutationVariables>(CreatePlanDocument, options);
      }
export type CreatePlanMutationHookResult = ReturnType<typeof useCreatePlanMutation>;
export type CreatePlanMutationResult = Apollo.MutationResult<CreatePlanMutation>;
export type CreatePlanMutationOptions = Apollo.BaseMutationOptions<CreatePlanMutation, CreatePlanMutationVariables>;
export const DeletePlanDocument = gql`
    mutation deletePlan($planId: Int!) {
  deletePlan(id: $planId) {
    id
  }
}
    `;
export type DeletePlanMutationFn = Apollo.MutationFunction<DeletePlanMutation, DeletePlanMutationVariables>;

/**
 * __useDeletePlanMutation__
 *
 * To run a mutation, you first call `useDeletePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlanMutation, { data, loading, error }] = useDeletePlanMutation({
 *   variables: {
 *      planId: // value for 'planId'
 *   },
 * });
 */
export function useDeletePlanMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlanMutation, DeletePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlanMutation, DeletePlanMutationVariables>(DeletePlanDocument, options);
      }
export type DeletePlanMutationHookResult = ReturnType<typeof useDeletePlanMutation>;
export type DeletePlanMutationResult = Apollo.MutationResult<DeletePlanMutation>;
export type DeletePlanMutationOptions = Apollo.BaseMutationOptions<DeletePlanMutation, DeletePlanMutationVariables>;
export const GetFoodDocument = gql`
    query getFood($id: Int!) {
  food(id: $id) {
    id
    description
    brandName
  }
}
    `;

/**
 * __useGetFoodQuery__
 *
 * To run a query within a React component, call `useGetFoodQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFoodQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFoodQuery(baseOptions: Apollo.QueryHookOptions<GetFoodQuery, GetFoodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFoodQuery, GetFoodQueryVariables>(GetFoodDocument, options);
      }
export function useGetFoodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFoodQuery, GetFoodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFoodQuery, GetFoodQueryVariables>(GetFoodDocument, options);
        }
export type GetFoodQueryHookResult = ReturnType<typeof useGetFoodQuery>;
export type GetFoodLazyQueryHookResult = ReturnType<typeof useGetFoodLazyQuery>;
export type GetFoodQueryResult = Apollo.QueryResult<GetFoodQuery, GetFoodQueryVariables>;
export const GetFoodsWithNutrientsDocument = gql`
    query getFoodsWithNutrients($foodIds: [Int!]!) {
  foods(ids: $foodIds) {
    id
    description
    foodNutrients {
      id
      amount
      nutrient {
        id
        name
        unit
      }
    }
  }
}
    `;

/**
 * __useGetFoodsWithNutrientsQuery__
 *
 * To run a query within a React component, call `useGetFoodsWithNutrientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoodsWithNutrientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFoodsWithNutrientsQuery({
 *   variables: {
 *      foodIds: // value for 'foodIds'
 *   },
 * });
 */
export function useGetFoodsWithNutrientsQuery(baseOptions: Apollo.QueryHookOptions<GetFoodsWithNutrientsQuery, GetFoodsWithNutrientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFoodsWithNutrientsQuery, GetFoodsWithNutrientsQueryVariables>(GetFoodsWithNutrientsDocument, options);
      }
export function useGetFoodsWithNutrientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFoodsWithNutrientsQuery, GetFoodsWithNutrientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFoodsWithNutrientsQuery, GetFoodsWithNutrientsQueryVariables>(GetFoodsWithNutrientsDocument, options);
        }
export type GetFoodsWithNutrientsQueryHookResult = ReturnType<typeof useGetFoodsWithNutrientsQuery>;
export type GetFoodsWithNutrientsLazyQueryHookResult = ReturnType<typeof useGetFoodsWithNutrientsLazyQuery>;
export type GetFoodsWithNutrientsQueryResult = Apollo.QueryResult<GetFoodsWithNutrientsQuery, GetFoodsWithNutrientsQueryVariables>;
export const GetNutrientsDocument = gql`
    query getNutrients {
  nutrients {
    id
    name
    unit
  }
}
    `;

/**
 * __useGetNutrientsQuery__
 *
 * To run a query within a React component, call `useGetNutrientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNutrientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNutrientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNutrientsQuery(baseOptions?: Apollo.QueryHookOptions<GetNutrientsQuery, GetNutrientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNutrientsQuery, GetNutrientsQueryVariables>(GetNutrientsDocument, options);
      }
export function useGetNutrientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNutrientsQuery, GetNutrientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNutrientsQuery, GetNutrientsQueryVariables>(GetNutrientsDocument, options);
        }
export type GetNutrientsQueryHookResult = ReturnType<typeof useGetNutrientsQuery>;
export type GetNutrientsLazyQueryHookResult = ReturnType<typeof useGetNutrientsLazyQuery>;
export type GetNutrientsQueryResult = Apollo.QueryResult<GetNutrientsQuery, GetNutrientsQueryVariables>;
export const GetPlanDocument = gql`
    query getPlan($id: Int!) {
  plan(id: $id) {
    name
    startDate
    endDate
    ingredients {
      id
      amount
      measure
      order
      food {
        id
        description
        portions {
          measure
          gramWeight
        }
      }
    }
    meals {
      id
      servings
      order
      recipe {
        name
        id
      }
      ingredients {
        id
        amount
        measure
        order
        food {
          id
          description
          portions {
            measure
            gramWeight
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetPlanQuery__
 *
 * To run a query within a React component, call `useGetPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlanQuery(baseOptions: Apollo.QueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
      }
export function useGetPlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, options);
        }
export type GetPlanQueryHookResult = ReturnType<typeof useGetPlanQuery>;
export type GetPlanLazyQueryHookResult = ReturnType<typeof useGetPlanLazyQuery>;
export type GetPlanQueryResult = Apollo.QueryResult<GetPlanQuery, GetPlanQueryVariables>;
export const GetPlansDocument = gql`
    query getPlans {
  plans {
    id
    name
    startDate
    endDate
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPlansQuery__
 *
 * To run a query within a React component, call `useGetPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlansQuery(baseOptions?: Apollo.QueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
      }
export function useGetPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlansQuery, GetPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, options);
        }
export type GetPlansQueryHookResult = ReturnType<typeof useGetPlansQuery>;
export type GetPlansLazyQueryHookResult = ReturnType<typeof useGetPlansLazyQuery>;
export type GetPlansQueryResult = Apollo.QueryResult<GetPlansQuery, GetPlansQueryVariables>;
export const RemoveIngredientDocument = gql`
    mutation removeIngredient($id: Int!) {
  removeIngredient(id: $id) {
    id
  }
}
    `;
export type RemoveIngredientMutationFn = Apollo.MutationFunction<RemoveIngredientMutation, RemoveIngredientMutationVariables>;

/**
 * __useRemoveIngredientMutation__
 *
 * To run a mutation, you first call `useRemoveIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeIngredientMutation, { data, loading, error }] = useRemoveIngredientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveIngredientMutation(baseOptions?: Apollo.MutationHookOptions<RemoveIngredientMutation, RemoveIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveIngredientMutation, RemoveIngredientMutationVariables>(RemoveIngredientDocument, options);
      }
export type RemoveIngredientMutationHookResult = ReturnType<typeof useRemoveIngredientMutation>;
export type RemoveIngredientMutationResult = Apollo.MutationResult<RemoveIngredientMutation>;
export type RemoveIngredientMutationOptions = Apollo.BaseMutationOptions<RemoveIngredientMutation, RemoveIngredientMutationVariables>;
export const SearchFoodsDocument = gql`
    query SearchFoods($searchTerm: String!) {
  searchFoods(searchTerm: $searchTerm) {
    description
    id
    dataSource
    category
    brandName
    searchScore
    nutrientCount
  }
}
    `;

/**
 * __useSearchFoodsQuery__
 *
 * To run a query within a React component, call `useSearchFoodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchFoodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchFoodsQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchFoodsQuery(baseOptions: Apollo.QueryHookOptions<SearchFoodsQuery, SearchFoodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchFoodsQuery, SearchFoodsQueryVariables>(SearchFoodsDocument, options);
      }
export function useSearchFoodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchFoodsQuery, SearchFoodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchFoodsQuery, SearchFoodsQueryVariables>(SearchFoodsDocument, options);
        }
export type SearchFoodsQueryHookResult = ReturnType<typeof useSearchFoodsQuery>;
export type SearchFoodsLazyQueryHookResult = ReturnType<typeof useSearchFoodsLazyQuery>;
export type SearchFoodsQueryResult = Apollo.QueryResult<SearchFoodsQuery, SearchFoodsQueryVariables>;
export const UpdateIngredientDocument = gql`
    mutation updateIngredient($input: UpdateIngredientInput!) {
  updateIngredient(input: $input) {
    id
    amount
    measure
    order
  }
}
    `;
export type UpdateIngredientMutationFn = Apollo.MutationFunction<UpdateIngredientMutation, UpdateIngredientMutationVariables>;

/**
 * __useUpdateIngredientMutation__
 *
 * To run a mutation, you first call `useUpdateIngredientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIngredientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIngredientMutation, { data, loading, error }] = useUpdateIngredientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIngredientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIngredientMutation, UpdateIngredientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIngredientMutation, UpdateIngredientMutationVariables>(UpdateIngredientDocument, options);
      }
export type UpdateIngredientMutationHookResult = ReturnType<typeof useUpdateIngredientMutation>;
export type UpdateIngredientMutationResult = Apollo.MutationResult<UpdateIngredientMutation>;
export type UpdateIngredientMutationOptions = Apollo.BaseMutationOptions<UpdateIngredientMutation, UpdateIngredientMutationVariables>;
export const UpdatePlanDocument = gql`
    mutation updatePlan($input: UpdatePlanInput!) {
  updatePlan(input: $input) {
    id
    name
    startDate
    endDate
  }
}
    `;
export type UpdatePlanMutationFn = Apollo.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;

/**
 * __useUpdatePlanMutation__
 *
 * To run a mutation, you first call `useUpdatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanMutation, { data, loading, error }] = useUpdatePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlanMutation, UpdatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlanMutation, UpdatePlanMutationVariables>(UpdatePlanDocument, options);
      }
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = Apollo.MutationResult<UpdatePlanMutation>;
export type UpdatePlanMutationOptions = Apollo.BaseMutationOptions<UpdatePlanMutation, UpdatePlanMutationVariables>;