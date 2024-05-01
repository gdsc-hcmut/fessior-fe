import { AppRouterInstance, AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import React from 'react';

export type MockAppRouterContextProviderProps = {
  router: Partial<AppRouterInstance>;
  children: React.ReactNode;
};

const MockAppRouterContextProvider: React.FC<MockAppRouterContextProviderProps> = ({ router, children }) => {
  const mockedRouter: AppRouterInstance = {
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    ...router,
  };
  return <AppRouterContext.Provider value={mockedRouter}>{children}</AppRouterContext.Provider>;
};

export type MockSearchParamsContextProviderProps = {
  searchParams: URLSearchParams;
  children: React.ReactNode;
};

const MockSearchParamsContextProvider: React.FC<MockSearchParamsContextProviderProps> = ({
  searchParams,
  children,
}) => {
  return <SearchParamsContext.Provider value={searchParams}>{children}</SearchParamsContext.Provider>;
};

export type MockContextsProviderProps = {
  router: Partial<AppRouterInstance>;
  searchParams: URLSearchParams;
  children: React.ReactNode;
};

export const MockContextsProvider: React.FC<MockContextsProviderProps> = ({ router, searchParams, children }) => {
  return (
    <MockAppRouterContextProvider router={router}>
      <MockSearchParamsContextProvider searchParams={searchParams}>{children}</MockSearchParamsContextProvider>
    </MockAppRouterContextProvider>
  );
};
