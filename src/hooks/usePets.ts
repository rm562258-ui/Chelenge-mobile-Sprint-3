import { useMutation, useQueryClient } from '@tanstack/react-query';
import petService, { type PetPayload } from '../services/petService';
import { useApiQuery } from './useApiQuery';

export function usePets() {
    const queryKey = ['pets'];

    const list = useApiQuery<any, Error>(queryKey, () => petService.list().then((r) => r.data));

    return {
        ...list,
    };
}

export function usePet(id: string | undefined) {
    const queryKey = ['pets', id];

    return useApiQuery<any, Error>(queryKey, () => {
        if (!id) return Promise.resolve(null as any);
        return petService.detail(id).then((r) => r.data);
    }, { enabled: !!id });
}

export function useCreatePet() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: PetPayload) => petService.create(payload).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['pets'] }),
    });
}

export function useUpdatePet() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<PetPayload> }) => petService.update(id, payload).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['pets'] }),
    });
}

export function useDeletePet() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => petService.delete(id).then((r) => r.data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['pets'] }),
    });
}
