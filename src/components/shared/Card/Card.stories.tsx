import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Card from "./Card";

export default {
  title: "Components/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Content = Template.bind({});

export const WithHeader = Template.bind({});

Content.args = {
  children: (
    <>
      <Card.Content>Card Content</Card.Content>
    </>
  ),
};

WithHeader.args = {
  children: (
    <>
      <Card.Header>Card Header</Card.Header>
      <Card.Content>Card Content</Card.Content>
    </>
  ),
};
