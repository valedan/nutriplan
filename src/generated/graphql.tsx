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
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AddIngredientInput = {
  foodId: Scalars['Int'];
  planId?: Maybe<Scalars['Int']>;
  recipeId?: Maybe<Scalars['Int']>;
};

export type CreatePlanInput = {
  endDate: Scalars['DateTime'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type Food = {
  __typename?: 'Food';
  brandName?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  dataSource: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  nutrientCount: Scalars['Int'];
  nutrients: Array<FoodNutrient>;
  portions: Array<Portion>;
  searchScore?: Maybe<Scalars['Float']>;
};

export type FoodNutrient = {
  __typename?: 'FoodNutrient';
  amount: Scalars['Float'];
  id: Scalars['Int'];
  name: Scalars['String'];
  unit: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  amount: Scalars['Float'];
  food?: Maybe<Food>;
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
  order?: Maybe<Scalars['Int']>;
  plan?: Maybe<Plan>;
  recipe?: Maybe<Recipe>;
  servings: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addIngredient?: Maybe<Ingredient>;
  createPlan?: Maybe<Plan>;
  deletePlan?: Maybe<Plan>;
  removeIngredient?: Maybe<Ingredient>;
  reorderIngredients?: Maybe<Array<Maybe<Ingredient>>>;
  updateIngredient?: Maybe<Ingredient>;
  updatePlan?: Maybe<Plan>;
};


export type MutationAddIngredientArgs = {
  input: AddIngredientInput;
};


export type MutationCreatePlanArgs = {
  input: CreatePlanInput;
};


export type MutationDeletePlanArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveIngredientArgs = {
  id: Scalars['Int'];
};


export type MutationReorderIngredientsArgs = {
  input: ReorderIngredientsInput;
};


export type MutationUpdateIngredientArgs = {
  input: UpdateIngredientInput;
};


export type MutationUpdatePlanArgs = {
  input: UpdatePlanInput;
};

export type Nutrient = {
  __typename?: 'Nutrient';
  id: Scalars['Int'];
  name: Scalars['String'];
  unit: Scalars['String'];
};

export type Plan = {
  __typename?: 'Plan';
  createdAt: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  ingredients: Array<Ingredient>;
  meals: Array<Meal>;
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type Portion = {
  __typename?: 'Portion';
  gramWeight: Scalars['Float'];
  measure: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  food?: Maybe<Food>;
  foods: Array<Food>;
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


export type QueryPlanArgs = {
  id: Scalars['Int'];
};


export type QueryRecipeArgs = {
  id: Scalars['Int'];
};


export type QueryRecipesArgs = {
  ids: Array<Scalars['Int']>;
};


export type QuerySearchFoodsArgs = {
  searchTerm: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['Int'];
  ingredients: Array<Ingredient>;
  meals: Array<Meal>;
  name?: Maybe<Scalars['String']>;
  servings?: Maybe<Scalars['Int']>;
};

export type ReorderIngredientsInput = {
  parentId: Scalars['Int'];
  parentType: IngredientParent;
  reorders: Array<IngredientReorder>;
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

export type UpdatePlanInput = {
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export type AddIngredientMutationVariables = Exact<{
  input: AddIngredientInput;
}>;


export type AddIngredientMutation = { __typename?: 'Mutation', addIngredient?: Maybe<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food?: Maybe<{ __typename?: 'Food', id: number, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> }> }> };

export type CreatePlanMutationVariables = Exact<{
  input: CreatePlanInput;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan?: Maybe<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate?: Maybe<any>, endDate?: Maybe<any> }> };

export type GetFoodQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetFoodQuery = { __typename?: 'Query', food?: Maybe<{ __typename?: 'Food', id: number, description: string, brandName?: Maybe<string> }> };

export type GetFoodsWithNutrientsQueryVariables = Exact<{
  foodIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type GetFoodsWithNutrientsQuery = { __typename?: 'Query', foods: Array<{ __typename?: 'Food', id: number, nutrients: Array<{ __typename?: 'FoodNutrient', id: number, amount: number, name: string, unit: string }> }> };

export type GetNutrientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNutrientsQuery = { __typename?: 'Query', nutrients: Array<{ __typename?: 'Nutrient', id: number, name: string, unit: string }> };

export type GetPlanQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPlanQuery = { __typename?: 'Query', plan?: Maybe<{ __typename?: 'Plan', name?: Maybe<string>, startDate?: Maybe<any>, endDate?: Maybe<any>, ingredients: Array<{ __typename?: 'Ingredient', id: number, amount: number, measure: string, order: number, food?: Maybe<{ __typename?: 'Food', id: number, description: string, portions: Array<{ __typename?: 'Portion', measure: string, gramWeight: number }> }> }> }> };

export type GetPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlansQuery = { __typename?: 'Query', plans: Array<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate?: Maybe<any>, endDate?: Maybe<any>, createdAt: any, updatedAt: any }> };

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


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan?: Maybe<{ __typename?: 'Plan', id: number, name?: Maybe<string>, startDate?: Maybe<any>, endDate?: Maybe<any> }> };


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
    nutrients {
      id
      amount
      name
      unit
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