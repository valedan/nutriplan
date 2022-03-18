import classNames from "classnames";
import { Fragment, ReactNode } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface HeaderProps {
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

interface ContentProps {
  className?: string;
  children: ReactNode;
}

interface FooterProps {
  className?: string;
  children: ReactNode;
}

// TODO: Minor issue - when opening the modal on a page with a scrollbar, the scrollbar disappears, causing the navbar width to increase.

// I've remove mobile-specific styling here. When doing mobile, refer to the code examples on tailwindui and headlessui for what's missing.

function ContentModal({ open, onClose, children }: ModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 " onClose={onClose}>
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
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all align-middle max-w-4xl w-full max-h-[95vh]">
              <div className="flex flex-col ">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// TODO: Parent should automatically pass in `onClose`
function Header({ children, className, onClose }: HeaderProps) {
  return (
    <div className={classNames("flex justify-between text-left w-full border-b", className)}>
      <Dialog.Title as="h3" className="text-xl leading-6 text-gray-900 ">
        {children}
      </Dialog.Title>
      <div className="block absolute top-0 right-0 pt-4 pr-4">
        <button
          type="button"
          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none "
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Content({ children, className }: ContentProps) {
  return <div className={classNames(" flex-grow min-h-[10vh]", className)}>{children}</div>;
}

function Footer({ children, className }: FooterProps) {
  return <div className={classNames("gap-4 flex flex-row-reverse border-t", className)}>{children}</div>;
}

ContentModal.Header = Header;
ContentModal.Content = Content;
ContentModal.Footer = Footer;

export default ContentModal;
