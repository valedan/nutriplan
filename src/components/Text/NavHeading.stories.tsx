import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NavHeading from "./NavHeading";

export default {
  title: "Components/Text/NavHeading",
  component: NavHeading,
} as ComponentMeta<typeof NavHeading>;

const Template: ComponentStory<typeof NavHeading> = (args) => <NavHeading {...args} />;

export const Medium = Template.bind({});
Medium.args = {
  children: "NavHeading",
  to: "/",
};
