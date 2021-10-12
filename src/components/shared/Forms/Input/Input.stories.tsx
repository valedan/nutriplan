import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from "./Input";

export default {
  title: "Components/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  label: "Email",
  placeholder: "Enter your email",
  hint: "No spam, we promise!",
  error: "",
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Number = Template.bind({});
Number.args = {
  type: "number",
  label: "Amount",
  error: "",
};
