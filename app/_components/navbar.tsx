'use client';
import { Fragment, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useAuthContext } from '_context/auth';

const navigation = [{ name: 'Dashboard', href: '/' }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  const { logout, user, isLogin } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push('/login');
    }
  }, [isLogin, push]);

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <svg
                    width="39"
                    height="41"
                    viewBox="0 0 39 41"
                    className="flex-none inline-block mr-4"
                  >
                    <title>logo</title>
                    <g fillRule="nonzero" fill="none">
                      <path
                        d="M5.208 40.726c-2.804 0-5.074-2.279-5.074-5.093V5.093C.134 2.278 2.404 0 5.208 0l12.703.015c11.292 0 20.433 9.262 20.285 20.623-.149 11.183-9.438 20.088-20.582 20.088H5.208z"
                        fill="#E13F5E"
                      ></path>
                      <path
                        d="M7.76 31.821h-.652a.634.634 0 0 1-.638-.64v-5.108c0-.357.282-.64.638-.64h5.09c.356 0 .638.283.638.64v.655c0 2.815-2.27 5.093-5.075 5.093zM7.108 16.528H22.97c2.804 0 5.075-2.278 5.075-5.092v-.61a.666.666 0 0 0-.668-.67H11.56c-2.805 0-5.075 2.278-5.075 5.092v.64c0 .358.282.64.623.64zM7.108 24.167h8.25c2.805 0 5.075-2.278 5.075-5.092v-.64a.634.634 0 0 0-.638-.64H7.108a.634.634 0 0 0-.638.64v5.092c.015.357.297.64.638.64z"
                        fill="#FFF"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {isLogin &&
                    navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? 'border-slate-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                        )}
                        aria-current={
                          pathname === item.href ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                </div>
              </div>
              {user && (
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={
                            user?.avatar || 'https://avatar.vercel.sh/leerob'
                          }
                          height={32}
                          width={32}
                          alt={`${user?.fullName || 'placeholder'} avatar`}
                        />
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => logout()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {isLogin && navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {user && (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.avatar || 'https://avatar.vercel.sh/leerob'}
                        height={32}
                        width={32}
                        alt={`${user.fullName} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.fullName}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={logout}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
