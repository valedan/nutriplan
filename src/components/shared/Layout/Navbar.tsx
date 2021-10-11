/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useAuth0 } from "@auth0/auth0-react";
import Title from "./Title";
import Subtitle from "./Subtitle";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth0();
  const { pathname } = useRouter();

  let active = "plans";
  if (pathname.startsWith("/recipes")) {
    active = "recipes";
  } else if (pathname.startsWith("/groceries")) {
    active = "groceries";
  }

  if (!isAuthenticated) return null;

  return (
    <Disclosure as="nav" className="bg-white shadow fixed inset-x-0 z-50 top-0">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center align-items-center">
                  <Link href="/">
                    <a className=" inline-flex items-center px-1">
                      <Title />
                    </a>
                  </Link>
                  <Subtitle className="hidden md:flex ml-6" />
                </div>
              </div>
              <div className="hidden md:ml-6 md:flex md:items-center">
                <div className="hidden md:flex md:space-x-8 mr-4">
                  {/* Profile dropdown */}
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link href="/">
                    <a
                      className={classNames(
                        active === "plans"
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      )}
                    >
                      Plans
                    </a>
                  </Link>
                  <Link href="/recipes">
                    <a
                      className={classNames(
                        active === "recipes"
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      )}
                    >
                      Recipes
                    </a>
                  </Link>
                  <Link href="/groceries">
                    <a
                      className={classNames(
                        active === "groceries"
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      )}
                    >
                      Groceries
                    </a>
                  </Link>
                </div>
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      {user?.picture ? (
                        <img className="h-8 w-8 rounded-full" src={user.picture} alt="" />
                      ) : (
                        <UserCircleIcon className="block h-7 w-7 text-gray-600" />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/user/settings"
                            className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => logout({ returnTo: `${window.location.origin}/logged-out` })}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="mr-2 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Link href="/">
                <a className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Plans
                </a>
              </Link>
              <Link href="/recipes">
                <a className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Recipes
                </a>
              </Link>
              <Link href="/groceries">
                <a className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Groceries
                </a>
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  {user?.picture ? (
                    <img className="h-8 w-8 rounded-full" src={user.picture} alt="" />
                  ) : (
                    <UserCircleIcon className="block h-7 w-7 text-gray-600" />
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="/user/settings"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="/sign-out"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
