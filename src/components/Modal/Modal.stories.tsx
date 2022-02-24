import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AlertModal, Button } from "components";

export default {
  title: "Components/Modal",
  component: AlertModal,
} as ComponentMeta<typeof AlertModal>;

export const Basic: ComponentStory<typeof AlertModal> = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <Button onClick={openModal}>Open modal</Button>
      </div>

      <AlertModal
        open={isOpen}
        title="Payment successful"
        onConfirm={() => {}}
        confirmText="Deactivate"
        onClose={closeModal}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
          </p>
        </div>
      </AlertModal>
    </>
  );
};
