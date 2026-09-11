import { useMutation, useQueryClient } from '@tanstack/react-query';
import notificationService, { type NotificationPayload } from '../services/notificationService';
import { useApiQuery } from './useApiQuery';

const queryKey = ['notifications'];

export function useNotifications() {
    return useApiQuery(queryKey, () => notificationService.getAll().then((response) => response.data));
}

export function useCreateNotification() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: NotificationPayload) => notificationService.create(payload).then((response) => response.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    });
}

export function useDeleteNotification() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => notificationService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    });
}