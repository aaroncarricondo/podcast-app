
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAppSettings } from '../../contexts/AppSettings';
import { wrapper } from '../mocks/test-utils';

describe('App settings context', () => {
  it('should be default not loading', async () => {
    const { result } = renderHook(() => useAppSettings(), { wrapper });

    const { isLoading } = result.current;
    expect(isLoading).toBeFalsy();
  });

  it('should return loading if an operation is added', async () => {
    const { result } = renderHook(() => useAppSettings(), { wrapper });

    act(() => {
      const { addOperation } = result.current;
      addOperation('Operation1');
    })

    await waitFor(() => {
      const { isLoading } = result.current;
      expect(isLoading).toBeTruthy();
    });
  });

  it('should return not loading if an operation is added and then removed', async () => {
    const { result } = renderHook(() => useAppSettings(), { wrapper });

    act(() => {
      const { addOperation } = result.current;
      addOperation('Operation1');
    });

    await waitFor(() => {
      const { isLoading } = result.current;
      expect(isLoading).toBeTruthy();
    });

    act(() => {
      const { removeOperation } = result.current;
      removeOperation('Operation1');
    });

    await waitFor(() => {
      const { isLoading } = result.current;
      expect(isLoading).toBeFalsy();
    });
  });

  it('should still return loading if two operation are added and one is removed', async () => {
    const { result } = renderHook(() => useAppSettings(), { wrapper });

    act(() => {
      const { addOperation } = result.current;
      addOperation('Operation1');
      addOperation('Operation2');
    });

    await waitFor(() => {
      const { isLoading } = result.current;
      expect(isLoading).toBeTruthy();
    });

    act(() => {
      const { removeOperation } = result.current;
      removeOperation('Operation1');
    });

    await waitFor(() => {
      const { isLoading } = result.current;
      expect(isLoading).toBeTruthy();
    });
  });

  it('should throw error when not wrapped inside `AppSettingsProvider`', () => {
    expect(() => renderHook(() => useAppSettings()))
      .toThrow(Error('useAppSettings must be used within the corresponding AppSettingsProvider'));
  });
});