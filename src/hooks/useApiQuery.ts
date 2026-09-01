import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export function useApiQuery<TData, TError = Error>(
    queryKey: readonly unknown[],
    queryFn: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
    return useQuery<TData, TError>({
        queryKey,
        queryFn,
        ...options,
    });
}
