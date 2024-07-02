/* eslint-disable @typescript-eslint/naming-convention */
import { RenderOptions, render as baseRender } from '@testing-library/react';
import { ReactNode } from 'react';

declare global {
  declare function render(ui: ReactNode, options?: RenderOptions): ReturnType<typeof baseRender>;

  declare function renderWithContexts(ui: ReactNode, options?: RenderWithContextOptions): ReturnType<typeof baseRender>;

  namespace NodeJS {
    interface Global {
      render(ui: ReactNode, options?: RenderOptions): ReturnType<typeof baseRender>;
    }
  }
}

export type RenderWithContextOptions = {
  router?: Partial<AppRouterInstance>;
  searchParams?: URLSearchParams;
} & RenderOptions;



declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
