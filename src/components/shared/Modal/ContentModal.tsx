import { Fragment, ReactNode, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import Button from "../Button/Button";

interface Props {
  open: boolean;
  title: string | ReactNode;
  onClose: () => void;
  children: ReactNode;
}

// TODO: Minor issue - when opening the modal on a page with a scrollbar, the scrollbar disappears, causing the navbar width to increase.

// I've remove mobile-specific styling here. When doing mobile, refer to the code examples on tailwindui and headlessui for what's missing.

export default function ContentModal({ open, onClose, title, children }: Props) {
  const closeButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" initialFocus={closeButtonRef} onClose={onClose}>
        <div className="min-h-screen text-center block">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block align-middle h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-0 scale-95"
          >
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all align-middle max-w-4xl w-full ">
              <div className="flex flex-col max-h-3/4 min-h-3/4">
                <div className="p-4 flex justify-between text-left w-full border-b">
                  <Dialog.Title as="h3" className="text-xl leading-6 text-gray-900 ">
                    {title}
                  </Dialog.Title>
                  <div className="block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="p-4 overflow-y-auto flex-grow">{children}</div>
                <div className="p-4 gap-4 flex flex-row-reverse border-t">
                  <Button onClick={onClose} variant="ghost" ref={closeButtonRef}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
