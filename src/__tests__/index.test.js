import { render, screen } from '@testing-library/react';

import AboutPage from '../app/about/page';
import '@testing-library/jest-dom';

describe('AboutPage', () => {
  it('renders about page', () => {
    render(<AboutPage />);

    const element = screen.getByTestId('about-page');

    expect(element).toBeInTheDocument();
  });
});
