import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Card, Heading } from "components";

export default {
  title: "Components/Text/Heading",
  component: Heading,
} as ComponentMeta<typeof Heading>;

export const All: ComponentStory<typeof Heading> = () => {
  return (
    <Card>
      <Card.Content className="flex-col">
        <Heading weight="light" size="medium">
          Light Medium
        </Heading>
        <Heading weight="normal" size="medium">
          Normal Medium
        </Heading>
        <Heading weight="heavy" size="medium">
          Heavy Medium
        </Heading>
      </Card.Content>
    </Card>
  );
};
