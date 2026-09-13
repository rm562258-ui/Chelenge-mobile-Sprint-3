import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getOfflinePets } from '../services/offlinePetStorage';
import { petService, type PetPayload } from '../services/petService';
import { useApiQuery } from './useApiQuery';

const PETS_QUERY_KEY = ['pets'];

export function usePets() {
    const queryKey = PETS_QUERY_KEY;

    const qc = useQueryClient();
    useEffect(() => {
        void getOfflinePets().then((localPets) => {
            if (localPets.length > 0) qc.setQueryData(PETS_QUERY_KEY, localPets);
        });
    }, [qc]);

    const list = useQuery<any[], Error>({
        queryKey,
        queryFn: async () => {
            const localPets = await getOfflinePets();
            if (localPets.length > 0) qc.setQueryData(queryKey, localPets);
            const result = await petService.list();
            return result.data;
        },
    });

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
        onSuccess: (_data, id) => {
            qc.setQueryData<any[]>(PETS_QUERY_KEY, (current = []) => current.filter((pet) => String(pet.id) !== String(id)));
            void qc.invalidateQueries({ queryKey: PETS_QUERY_KEY });
        },
    });
}
