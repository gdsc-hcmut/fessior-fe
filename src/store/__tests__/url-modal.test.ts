import { act, renderHook } from '@testing-library/react';

import { useUrlModalStore } from '../url-modal';

describe('useUrlModalStore', () => {
  it('return the initial state', () => {
    // Arrange
    const { result } = renderHook(() => useUrlModalStore());

    expect(result.current.editedUrl).toEqual({
      originalUrl: '',
      slug: '',
      domain: '',
      totalClicks: 0,
      enable: false,
      createdAt: '',
      category: [],
    });
    expect(result.current.isShow).toEqual({
      delete: false,
      edit: false,
      category: false,
    });
  });

  it('set the editedUrl data', () => {
    const stubUrl = {
      originalUrl: 'https://example.com',
      slug: 'example',
      domain: 'example.com',
      totalClicks: 0,
      enable: true,
      createdAt: '2021-08-01T00:00:00Z',
      category: ['example'],
    };

    const { result } = renderHook(() => useUrlModalStore());

    act(() => {
      result.current.setEditedUrl(stubUrl);
    });

    expect(result.current.editedUrl).toEqual(stubUrl);
  });

  it('set edit modal visibility', () => {
    const { result } = renderHook(() => useUrlModalStore());

    act(() => {
      result.current.setShowEditModal(true);
    });

    expect(result.current.isShow.edit).toBe(true);
  });

  it('set delete modal visibility', () => {
    const { result } = renderHook(() => useUrlModalStore());

    act(() => {
      result.current.setShowDeleteModal(true);
    });

    expect(result.current.isShow.delete).toBe(true);
  });

  it('set category modal visibility', () => {
    const { result } = renderHook(() => useUrlModalStore());

    act(() => {
      result.current.setShowCategoryModal(true);
    });

    expect(result.current.isShow.category).toBe(true);
  });
});
