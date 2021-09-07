import { DocumentNode } from "graphql";

declare module "*.graphql" {
  const Schema: DocumentNode;

  export = Schema;
}

declare module "*.gql" {
  const Schema: DocumentNode;

  export = Schema;
}
