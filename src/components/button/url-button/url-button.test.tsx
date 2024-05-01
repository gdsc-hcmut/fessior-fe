import { fireEvent, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { useUrlModalStore } from '@/store/url-modal';

import UrlButton from '.';

jest.mock('@/store/url-modal', () => ({
  useUrlModalStore: jest.fn().mockReturnValue({
    setShowEditModal: jest.fn(),
    setShowDeleteModal: jest.fn(),
    setEditedUrl: jest.fn(),
  }),
}));

describe('UrlButton', () => {
  // enable navigator.clipboard methods
  userEvent.setup();

  beforeEach(() => {
    jest.useFakeTimers();
    // jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const myUrl = {
    id: 'id',
    url: 'url',
    originalUrl: 'originalUrl',
    title: 'title',
    slug: 'slug',
    domain: 'domain',
    totalClicks: 0,
    enable: true,
    createdAt: 'createdAt',
    description: 'description',
    tags: ['tag1', 'tag2'],
    category: ['category'],
  };

  it('should render', () => {
    const screen = render(<UrlButton copyContent='copyContent' editedUrl={myUrl} />);
    expect(screen.getByAltText('Copy icon')).toBeInTheDocument();
    expect(screen.getByAltText('Edit icon')).toBeInTheDocument();
    expect(screen.getByAltText('Delete icon')).toBeInTheDocument();
  });

  it('should copy content', async () => {
    const screen = render(<UrlButton copyContent='copyContent' editedUrl={myUrl} />);

    const copyButton = screen.getByAltText('Copy icon');

    fireEvent.click(copyButton.parentElement as HTMLElement);

    const clipboardText = await navigator.clipboard.readText();

    expect(clipboardText).toBe('copyContent');
    expect(copyButton).toHaveAttribute('src', '/icons/url/check_royal.svg');

    await waitFor(
      async () => {
        await jest.advanceTimersByTimeAsync(1500);

        expect(copyButton).toHaveAttribute('src', '/icons/url/content_copy.svg');
      },
      { timeout: 2000 },
    );
  });

  it('should open edit modal', async () => {
    const mockSetShowEditModal = jest.fn();
    (useUrlModalStore as unknown as jest.Mock).mockReturnValue({
      ...useUrlModalStore(),
      setShowEditModal: mockSetShowEditModal,
    });

    const screen = render(<UrlButton copyContent='copyContent' editedUrl={myUrl} />);

    fireEvent.click(screen.getByAltText('Edit icon').parentElement as HTMLElement);

    await waitFor(() => {
      expect(mockSetShowEditModal).toHaveBeenCalledTimes(1);
    });
  });

  it('should open delete modal', async () => {
    const mockSetShowDeleteModal = jest.fn();
    (useUrlModalStore as unknown as jest.Mock).mockReturnValue({
      ...useUrlModalStore(),
      setShowDeleteModal: mockSetShowDeleteModal,
    });

    const screen = render(<UrlButton copyContent='copyContent' editedUrl={myUrl} />);

    fireEvent.click(screen.getByAltText('Delete icon').parentElement as HTMLElement);

    await waitFor(() => {
      expect(mockSetShowDeleteModal).toHaveBeenCalledTimes(1);
    });
  });
});
