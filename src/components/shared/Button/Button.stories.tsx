import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  variant: "secondary",
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: "Ghost",
  variant: "ghost",
};

export const Danger = Template.bind({});
Danger.args = {
  children: "Danger",
  variant: "danger",
};

export const All: ComponentStory<typeof Button> = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Button> Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex gap-2">
        <Button size="small"> Primary</Button>
        <Button size="small" variant="secondary">
          Secondary
        </Button>
        <Button size="small" variant="ghost">
          Ghost
        </Button>
        <Button size="small" variant="danger">
          Danger
        </Button>
      </div>
    </div>
  );
};
