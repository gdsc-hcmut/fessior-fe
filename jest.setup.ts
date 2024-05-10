import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { MockContextsProvider } from '@/testUtils/MockContexts';
import { RenderWithContextOptions } from './global';

const renderWithContexts = (ui: React.ReactNode, options?: RenderWithContextOptions) => {
  return render(ui, {
    wrapper: ({ children }) =>
      MockContextsProvider({
        router: options?.router || {},
        searchParams: options?.searchParams || new URLSearchParams(''),
        children,
      }),
  });
};

beforeEach(() => {
  global.render = render;
  global.renderWithContexts = renderWithContexts;

  jest.spyOn(console, 'log');
  jest.spyOn(console, 'info');
  jest.spyOn(console, 'warn');
  jest.spyOn(console, 'error');
});
