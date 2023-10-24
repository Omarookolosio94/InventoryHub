/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function About() {
  return (
    <>
      <div className="dark:bg-tuna min-h-[640px] bg-white">
        <div>
          <div className="bg-alabaster dark:bg-cinder z-50 hidden md:fixed md:inset-y-0 md:w-72 md:flex-col lg:flex">
            <div className="border-smoke dark:border-gun flex min-h-0 flex-1 flex-col border-r">
              <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5 lg:pl-6">
                <div className="text-comet flex flex-shrink-0 items-center px-4 dark:text-white">
                  <a href="/">
                    <span className="inline-flex items-center font-bold tracking-tighter">
                      <svg
                        className="h-8 w-8"
                        viewBox="0 0 147 148"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Group</title>
                        <desc>Created with Sketch.</desc>
                        <g
                          id="Page-1"
                          stroke="none"
                          stroke-width="1"
                          fill="none"
                          fill-rule="evenodd"
                        >
                          <g id="Group">
                            <path
                              d="M73,74 L147,74 L147,148 L93,148 C81.954305,148 73,139.045695 73,128 L73,74 Z"
                              fill="#d5ddfe"
                              transform="translate(110.000000, 111.000000) rotate(-90.000000) translate(-110.000000, -111.000000) "
                            ></path>

                            <path
                              d="M0,0 L74,0 L74,74 L20,74 C8.954305,74 1.3527075e-15,65.045695 0,54 L0,0 Z"
                              fill="#445cff"
                              transform="translate(37.000000, 37.000000) scale(-1, -1) rotate(-90.000000) translate(-37.000000, -37.000000) "
                            ></path>
                          </g>
                        </g>
                      </svg>

                      <span className="ml-4 lg:text-2xl">Dockerz</span>
                    </span>
                  </a>
                </div>
                <nav className="mt-12 flex-1">
                  <div className="dark:border-tuna border-l">
                    <div>
                      <a
                        className="hover:bg-icy border-periblue dark:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river group flex items-center border-l-2 bg-white p-2 pl-6 text-base font-light"
                        href="/"
                      >
                        Quickstart
                      </a>
                      <div>
                        <button className="dark:hover:bg-tuna focus:border-periblue border-transparent inline-flex w-full items-center border-l-2 pr-4 hover:bg-white">
                          <span className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river group inline-flex items-center p-2 pl-6 text-base font-light">
                            Designing
                          </span>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="text-oyster dark:text-manatee dark:hover:text-periblue ml-auto inline h-5 w-5 rotate-0 transform transition-transform duration-200"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>

                        <div className="dark:border-tuna -px-px border-l p-2 pl-6">
                          <ul>
                            <li>
                              <a
                                className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                href="/starter"
                              >
                                Get Started
                              </a>
                            </li>
                            <li>
                              <a
                                className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                href="/design-kit"
                              >
                                Design Kits
                              </a>
                            </li>
                            <li>
                              <a
                                className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                href="/design-resources"
                              >
                                Resources
                              </a>
                            </li>
                            <li>
                              <a
                                className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                href="/tutorials"
                              >
                                Tutorials
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <button className="dark:hover:bg-tuna focus:border-periblue border-transparent inline-flex w-full items-center border-l-2 pr-4 hover:bg-white">
                          <span className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river group inline-flex items-center p-2 pl-6 text-base font-light">
                            Developing
                          </span>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="text-oyster dark:text-manatee dark:hover:text-periblue ml-auto inline h-5 w-5 rotate-0 transform transition-transform duration-200"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>

                        <div className="dark:border-tuna -px-px border-l p-2 pl-6">
                          <ul>
                            <li>
                              <a
                                className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                href="/starter"
                              >
                                Get started
                              </a>
                            </li>
                            <li>
                              <a
                                className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                href="/frameworks"
                              >
                                Frameworks
                              </a>
                            </li>
                            <li>
                              <a
                                className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                href="/developer-resources"
                              >
                                Resources
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <a
                        className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river group flex items-center p-2 pl-6 text-base font-light hover:bg-white"
                        href="/recomendations"
                      >
                        Recommendations
                      </a>
                    </div>
                    <div className="mt-12 pl-6">
                      <p className="text-comet dark:text-manatee text-sm font-semibold uppercase">
                        Development
                      </p>
                    </div>
                    <div className="mt-3">
                      <a
                        className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river border-transparent group flex items-center border-l p-2 pl-6 text-base font-light hover:bg-white"
                        href="/components"
                      >
                        Components
                      </a>

                      <a
                        className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river border-transparent group flex items-center border-l p-2 pl-6 text-base font-light hover:bg-white"
                        href="/style-guide"
                      >
                        Style Guide
                      </a>
                      <a
                        href="#"
                        className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river border-transparent group flex items-center border-l p-2 pl-6 text-base font-light hover:bg-white"
                      >
                        License
                      </a>
                      <a
                        href="https://github.com/WickedLabs/dockerz"
                        className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river border-transparent group flex items-center border-l p-2 pl-6 text-base font-light hover:bg-white"
                      >
                        Github Hub Repo
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="border-smoke dark:border-gun flex flex-shrink-0 border-t p-4 lg:p-12"></div>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <div className="relative z-0 flex-1 overflow-y-auto focus:outline-none lg:pl-72">
              <nav className="dark:bg-gun dark:border-gun border-smoke mx-auto border-b bg-white">
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="flex h-16 justify-between">
                    <div className="flex flex-1 items-center justify-center space-x-8 px-2 lg:ml-6 lg:justify-end">
                      <div className="w-full max-w-lg lg:max-w-xs">
                        <label className="sr-only">Search</label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                              className="text-metal h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            id="search"
                            name="search"
                            className="text-mana border-smoke dark:bg-tuna placeholder-santa focus:placeholder-oyster focus:ring-oyster focus:border-oyster dark:border-river block w-full rounded-md border bg-white py-2 pl-10 pr-3 leading-5 focus:outline-none focus:ring-1 sm:text-sm"
                            placeholder="Search"
                            type="search"
                          />
                        </div>
                      </div>
                      <button
                        id="dark-mode-toggle"
                        className="text-pearl dark:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2V4a8 8 0 1 0 0 16z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
              <div
                className="fixed inset-0 z-40 flex lg:hidden"
                aria-modal="true"
              >
                <div
                  className="fixed inset-0 bg-gray-600 bg-opacity-75"
                  aria-hidden="true"
                ></div>

                <div className="dark:bg-pearl relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <div className="absolute right-0 top-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                      <span className="sr-only">Close sidebar</span>
                      <svg
                        className="h-6 w-6 text-white"
                        x-description="Heroicon name: outline/x"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="h-0 flex-1 overflow-y-auto pb-4 pt-5">
                    <div className="text-comet flex flex-shrink-0 items-center px-4 dark:text-white">
                      <a href="/">
                        <span className="inline-flex items-center font-bold tracking-tighter">
                          <svg
                            className="h-8 w-8"
                            viewBox="0 0 147 148"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Group</title>
                            <desc>Created with Sketch.</desc>
                            <g
                              id="Page-1"
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <g id="Group">
                                <path
                                  d="M73,74 L147,74 L147,148 L93,148 C81.954305,148 73,139.045695 73,128 L73,74 Z"
                                  fill="#d5ddfe"
                                  transform="translate(110.000000, 111.000000) rotate(-90.000000) translate(-110.000000, -111.000000) "
                                ></path>

                                <path
                                  d="M0,0 L74,0 L74,74 L20,74 C8.954305,74 1.3527075e-15,65.045695 0,54 L0,0 Z"
                                  fill="#445cff"
                                  transform="translate(37.000000, 37.000000) scale(-1, -1) rotate(-90.000000) translate(-37.000000, -37.000000) "
                                ></path>
                              </g>
                            </g>
                          </svg>

                          <span className="ml-4 lg:text-2xl">Dockerz</span>
                        </span>
                      </a>
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      <div className="dark:border-tuna border-l">
                        <div>
                          <a
                            className="hover:bg-icy border-periblue dark:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river group flex items-center border-l-2 bg-white p-2 pl-6 text-base font-light"
                            href="/"
                          >
                            Quickstart
                          </a>
                          <div>
                            <button className="dark:hover:bg-tuna focus:border-periblue border-transparent inline-flex w-full items-center border-l-2 pr-4 hover:bg-white">
                              <span className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river group inline-flex items-center p-2 pl-6 text-base font-light">
                                Designing
                              </span>
                              <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                className="text-oyster dark:text-manatee dark:hover:text-periblue ml-auto inline h-5 w-5 rotate-0 transform transition-transform duration-200"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </button>

                            <div className="dark:border-tuna -px-px border-l p-2 pl-6">
                              <ul>
                                <li>
                                  <a
                                    className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                    href="/starter"
                                  >
                                    Get Started
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                    href="/design-kit"
                                  >
                                    Design Kits
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                    href="/design-resources"
                                  >
                                    Resources
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                    href="/tutorials"
                                  >
                                    Tutorials
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div>
                            <button className="dark:hover:bg-tuna focus:border-periblue border-transparent inline-flex w-full items-center border-l-2 pr-4 hover:bg-white">
                              <span className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river group inline-flex items-center p-2 pl-6 text-base font-light">
                                Developing
                              </span>
                              <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                className="text-oyster dark:text-manatee dark:hover:text-periblue ml-auto inline h-5 w-5 rotate-0 transform transition-transform duration-200"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </button>

                            <div className="dark:border-tuna -px-px border-l p-2 pl-6">
                              <ul>
                                <li>
                                  <a
                                    className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                    href="/starter"
                                  >
                                    Get started
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                    href="/frameworks"
                                  >
                                    Frameworks
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river dark:hover:bg-tuna focus:border-periblue border-transparent group flex items-center border-l-2 p-2 pl-3 text-base font-light hover:bg-white"
                                    href="/developer-resources"
                                  >
                                    Resources
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <a
                            className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river group flex items-center p-2 pl-6 text-base font-light hover:bg-white"
                            href="/recomendations"
                          >
                            Recommendations
                          </a>
                        </div>
                        <div className="mt-12 pl-6">
                          <p className="text-comet dark:text-manatee text-sm font-semibold uppercase">
                            Development
                          </p>
                        </div>
                        <div className="mt-3">
                          <a
                            className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river border-transparent group flex items-center border-l p-2 pl-6 text-base font-light hover:bg-white"
                            href="/components"
                          >
                            Components
                          </a>

                          <a
                            className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river border-transparent group flex items-center border-l p-2 pl-6 text-base font-light hover:bg-white"
                            href="/style-guide"
                          >
                            Style Guide
                          </a>
                          <a
                            href="#"
                            className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river border-transparent group flex items-center border-l p-2 pl-6 text-base font-light hover:bg-white"
                          >
                            License
                          </a>
                          <a
                            href="https://github.com/WickedLabs/dockerz"
                            className="dark:hover:bg-tuna text-oyster dark:text-manatee dark:hover:text-periblue hover:text-river border-transparent group flex items-center border-l p-2 pl-6 text-base font-light hover:bg-white"
                          >
                            Github Hub Repo
                          </a>
                        </div>
                      </div>
                    </nav>
                  </div>
                  <div className="border-smoke dark:border-tuna flex flex-shrink-0 border-t p-4 pl-12"></div>
                </div>

                <div className="w-14 flex-shrink-0"></div>
              </div>
              <div className="dark:bg-pearl sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
                <button
                  type="button"
                  className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="h-6 w-6"
                    x-description="Heroicon name: outline/menu"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="mx-auto flex-1">
                <section className="dark:bg-tuna border-periblue dark:border-gun mx-auto max-w-7xl border-b bg-white">
                  <div className="mx-auto max-w-7xl px-4 pt-44 sm:px-6 md:px-32">
                    <h1
                      data-animate="title"
                      className="text-comet dark:text-manatee mx-auto py-10 text-4xl font-light leading-none tracking-tighter lg:text-5xl"
                      style={{ opacity: 1, transform: "translateY(0px)" }}
                    >
                      What is Dockerz?
                    </h1>
                  </div>
                </section>
                <section className="dark:bg-tuna bg-white pb-24 pt-6">
                  <div className="mx-auto px-4 sm:px-6 md:px-32">
                    <section>
                      <div className="max-w-3xl">
                        <div className="mx-auto space-y-24 text-left text-lg">
                          <div className="space-y-8">
                            <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg md:mt-5 md:text-xl">
                              Dockerz is Wicked's open source design system for
                              products and digital experiences. With the Wicked
                              Design Language as its foundation, the system
                              consists of working code, design tools and
                              resources, human interface guidelines, and a
                              vibrant community of contributors.
                            </p>
                            <div>
                              <ul className="list-none space-y-3 text-base sm:text-lg md:mt-5 md:text-xl">
                                <li>
                                  <a
                                    className="text-waterloo dark:text-santa hover:text-oyster dark:hover:text-oyster font-light"
                                    href="#overview"
                                  >
                                    ↳ Overview
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="text-waterloo dark:text-santa hover:text-oyster dark:hover:text-oyster font-light"
                                    href="#howitworks"
                                  >
                                    ↳ How Dockerz works
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="text-waterloo dark:text-santa hover:text-oyster dark:hover:text-oyster font-light"
                                    href="#stack"
                                  >
                                    ↳ Tech stack used at Dockerz
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="text-waterloo dark:text-santa hover:text-oyster dark:hover:text-oyster font-light"
                                    href="#contact"
                                  >
                                    ↳ Contact us
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="space-y-12" id="overview">
                            <h2 className="text-comet dark:text-manatee hover:text-oyster group text-lg font-normal lg:text-2xl">
                              <a
                                href=""
                                className="text-comet dark:text-manatee dark:hover:text-periblue inline-flex items-center gap-4"
                              >
                                Overview
                                <svg
                                  className="hidden h-6 w-6 group-hover:block"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path
                                    fill="currentColor"
                                    d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                                  ></path>
                                </svg>
                              </a>
                            </h2>
                            <div className="space-y-6">
                              <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg">
                                Quis semper vulputate aliquam venenatis egestas
                                sagittis quisque orci. Donec commodo sit viverra
                                aliquam porttitor ultrices gravida eu. Tincidunt
                                leo, elementum mattis elementum ut nisl, justo,
                                amet, mattis. Nunc purus, diam commodo tincidunt
                                turpis. Amet, duis sed elit interdum dignissim.
                              </p>

                              <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg">
                                Id orci tellus laoreet id ac. Dolor, aenean leo,
                                ac etiam consequat in. Convallis arcu ipsum urna
                                nibh. Pharetra, euismod vitae interdum mauris
                                enim, consequat vulputate nibh. Maecenas
                                pellentesque id sed tellus mauris, ultrices
                                mauris. Tincidunt enim cursus ridiculus mi.
                                Pellentesque nam sed nullam sed diam turpis
                                ipsum eu a sed convallis diam.
                              </p>
                            </div>
                          </div>
                          <div className="space-y-12">
                            <h3 className="text-comet dark:text-manatee hover:text-oyster group text-lg font-normal lg:text-xl">
                              <a
                                href=""
                                className="text-comet dark:text-manatee dark:hover:text-periblue inline-flex items-center gap-4"
                              >
                                Dockerz is open source
                                <svg
                                  className="hidden h-6 w-6 group-hover:block"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path
                                    fill="currentColor"
                                    d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                                  ></path>
                                </svg>
                              </a>
                            </h3>
                            <div className="space-y-6">
                              <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg">
                                Quis semper vulputate aliquam venenatis egestas
                                sagittis quisque orci. Donec commodo sit viverra
                                aliquam porttitor ultrices gravida eu. Tincidunt
                                leo, elementum mattis elementum ut nisl, justo,
                                amet, mattis. Nunc purus, diam commodo tincidunt
                                turpis. Amet, duis sed elit interdum dignissim.
                              </p>
                            </div>
                          </div>
                          <div className="space-y-12" id="howitworks">
                            <h2 className="text-comet dark:text-manatee hover:text-oyster group text-lg font-normal lg:text-2xl">
                              <a
                                href=""
                                className="text-comet dark:text-manatee dark:hover:text-periblue inline-flex items-center gap-4"
                              >
                                How Dockerz works
                                <svg
                                  className="hidden h-6 w-6 group-hover:block"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path
                                    fill="currentColor"
                                    d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                                  ></path>
                                </svg>
                              </a>
                            </h2>
                            <div className="space-y-6">
                              <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg">
                                Quis semper vulputate aliquam venenatis egestas
                                sagittis quisque orci. Donec commodo sit viverra
                                aliquam porttitor ultrices gravida eu.
                              </p>
                            </div>
                          </div>
                          <div className="space-y-12">
                            <h3 className="text-comet dark:text-manatee hover:text-oyster group text-lg font-normal lg:text-xl">
                              <a
                                href=""
                                className="text-comet dark:text-manatee dark:hover:text-periblue inline-flex items-center gap-4"
                              >
                                Our guiding principles
                                <svg
                                  className="hidden h-6 w-6 group-hover:block"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path
                                    fill="currentColor"
                                    d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                                  ></path>
                                </svg>
                              </a>
                            </h3>
                            <div className="space-y-6">
                              <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg">
                                <strong className="text-comet dark:text-manatee">
                                  Quis semper vulputate
                                </strong>
                                aliquam venenatis egestas sagittis quisque orci.
                                Donec commodo sit viverra aliquam porttitor
                                ultrices gravida eu.
                              </p>
                              <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg">
                                <strong className="text-comet dark:text-manatee">
                                  Quis semper
                                </strong>
                                aliquam venenatis egestas sagittis quisque orci.
                                Donec commodo sit viverra
                                <a
                                  href="#"
                                  className="text-oyster hover:text-comet dark:text-manatee underline"
                                >
                                  aliquam porttitor ultrices gravida
                                </a>
                                eu aliquam venenatis egestas sagittis quisque
                                orci. Donec commodo sit viverra aliquam
                                porttitor ultrices gravida eu.
                              </p>
                              <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg">
                                <strong className="text-comet dark:text-manatee">
                                  Quis semper vulputate aliquam venenatis
                                </strong>
                                egestas sagittis quisque orci.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-12" id="stack">
                            <h2 className="text-comet dark:text-manatee hover:text-oyster group text-lg font-normal lg:text-2xl">
                              <a
                                href="#"
                                className="inline-flex items-center gap-4"
                              >
                                Teck stack used on Dockerz
                                <svg
                                  className="hidden h-6 w-6 group-hover:block"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path
                                    fill="currentColor"
                                    d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"
                                  ></path>
                                </svg>
                              </a>
                            </h2>
                            <div className="space-y-6">
                              <p className="text-waterloo dark:text-santa text-base font-light sm:text-lg">
                                Quis semper vulputate aliquam venenatis egestas
                                sagittis quisque orci. Donec commodo sit viverra
                                aliquam porttitor ultrices gravida eu.
                              </p>
                              <div>
                                <ul className="text-comet dark:text-manatee list-none space-y-3 text-base sm:text-lg md:mt-8 md:text-base">
                                  <li>
                                    -
                                    <a
                                      className="text-oyster hover:text-comet dark:text-periblue dark:hover:text-metal font-light"
                                      href="#"
                                    >
                                      {" "}
                                      Alpine{" "}
                                    </a>
                                    Donec sit utate aliquam ven.
                                  </li>
                                  <li>
                                    -
                                    <a
                                      className="text-oyster hover:text-comet dark:text-periblue dark:hover:text-metal font-light"
                                      href="#"
                                    >
                                      {" "}
                                      Next.js{" "}
                                    </a>
                                    Donec commodo sit utate aliquam.
                                  </li>
                                  <li>
                                    -
                                    <a
                                      className="text-oyster hover:text-comet dark:text-periblue dark:hover:text-metal font-light"
                                      href="#"
                                    >
                                      {" "}
                                      React{" "}
                                    </a>
                                    Donec sit.
                                  </li>
                                  <li>
                                    -
                                    <a
                                      className="text-oyster hover:text-comet dark:text-periblue dark:hover:text-metal font-light"
                                      href="#"
                                    >
                                      {" "}
                                      Vue{" "}
                                    </a>
                                    Donec commodo.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-comet dark:text-manatee hover:text-oyster text-sm font-normal underline">
                              <a href=""> Edit this page on GitHub </a>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-50">
        <a
          href="#top"
          aria-label="Back to top"
          className="bg-oyster fixed bottom-0 right-0 mx-5 my-5 rounded-full p-2 text-white hover:bg-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-8v4h-2v-4H8l4-4 4 4h-3z"
              fill="rgba(255,255,255,1)"
            ></path>
          </svg>
        </a>
      </div>
    </>
  );
}
