import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Select from "./Select";

export default {
  title: "Components/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  label: "Location",
  hint: "We don't ship to Asia",
  children: [<option key="usa">USA</option>, <option key="canada">Canada</option>, <option key="uk">UK</option>],
};
