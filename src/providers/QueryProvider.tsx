import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode, useState } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                staleTime: 1000 * 60, // 1 minute
                gcTime: 1000 * 60 * 5, // 5 minutes
                refetchOnWindowFocus: true,
                refetchOnReconnect: true,
                refetchOnMount: false,
            },
            mutations: {
                retry: 0,
            },
        },
    }));

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
