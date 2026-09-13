import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { appointmentService, type AppointmentPayload } from '../services/appointmentService';
import { getOfflineAppointments } from '../services/offlineAppointmentStorage';

const APPOINTMENTS_QUERY_KEY = ['appointments'];

export function useAppointments() {
    const queryKey = APPOINTMENTS_QUERY_KEY;
    const qc = useQueryClient();

    useEffect(() => {
        void getOfflineAppointments().then((localAppointments) => {
            if (localAppointments.length > 0) qc.setQueryData(APPOINTMENTS_QUERY_KEY, localAppointments);
        });
    }, [qc]);

    const list = useQuery<any[], Error>({
        queryKey,
        queryFn: async () => {
            const localAppointments = await getOfflineAppointments();
            if (localAppointments.length > 0) qc.setQueryData(queryKey, localAppointments);
            const result = await appointmentService.list();
            return result.data;
        },
    });

    return {
        ...list,
    };
}

export function useCreateAppointment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: AppointmentPayload) => appointmentService.create(payload).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: APPOINTMENTS_QUERY_KEY }),
    });
}

export function useUpdateAppointment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<AppointmentPayload> }) => appointmentService.update(id, payload).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: APPOINTMENTS_QUERY_KEY }),
    });
}

export function useDeleteAppointment() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => appointmentService.delete(id).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: APPOINTMENTS_QUERY_KEY }),
    });
}
