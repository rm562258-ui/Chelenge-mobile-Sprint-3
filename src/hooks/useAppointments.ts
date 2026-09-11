import { useMutation, useQueryClient } from '@tanstack/react-query';
import appointmentService, { type AppointmentPayload } from '../services/appointmentService';
import { useApiQuery } from './useApiQuery';

export function useAppointments() {
    const queryKey = ['appointments'];

    const list = useApiQuery<any, Error>(queryKey, () => appointmentService.list().then((r) => r.data));

    return {
        ...list,
    };
}

export function useCreateAppointment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: AppointmentPayload) => appointmentService.create(payload).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['appointments'] }),
    });
}

export function useUpdateAppointment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<AppointmentPayload> }) => appointmentService.update(id, payload).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['appointments'] }),
    });
}

export function useDeleteAppointment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => appointmentService.delete(id).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['appointments'] }),
    });
}
