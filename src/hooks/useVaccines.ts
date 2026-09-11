import { useMutation, useQueryClient } from '@tanstack/react-query';
import vaccineService, { type VaccinePayload } from '../services/vaccineService';
import { useApiQuery } from './useApiQuery';

export function useVaccines() {
    const queryKey = ['vaccines'];

    const list = useApiQuery<any, Error>(queryKey, () => vaccineService.list().then((r) => r.data));

    return {
        ...list,
    };
}

export function useCreateVaccine() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: VaccinePayload) => vaccineService.create(payload).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['vaccines'] }),
    });
}

export function useUpdateVaccine() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<VaccinePayload> }) => vaccineService.update(id, payload).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['vaccines'] }),
    });
}

export function useDeleteVaccine() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => vaccineService.delete(id).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['vaccines'] }),
    });
}
