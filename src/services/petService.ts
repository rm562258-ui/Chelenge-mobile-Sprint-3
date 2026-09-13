import type { AxiosResponse } from 'axios';
import api from '../api/client';
import { createCrudService } from '../api/crudService';
import { API_ENDPOINTS } from '../api/endpoints';
import { showToast } from '../utils/toast';
import {
    deleteOfflinePet,
    getOfflinePets,
    saveOfflinePet,
    updateOfflinePet,
    type OfflinePet,
} from './offlinePetStorage';

export type PetPayload = {
    id?: string;
    petNome?: string;
    especie?: string;
    raca?: string;
    idade?: number | string;
    peso?: number | string;
    name: string;
    type?: string;
    breed?: string;
    age?: number | string;
    weight?: number | string;
    ownerName?: string;
    contact?: string;
    createdAt?: string;
    updatedAt?: string;
    pendingSync?: boolean;
    isLocalOnly?: boolean;
};

const crud = createCrudService<PetPayload>(API_ENDPOINTS.pets);

const now = () => new Date().toISOString();

const toPet = (pet: Partial<PetPayload>, id: string, localOnly: boolean): OfflinePet => ({
    ...pet,
    id,
    name: pet.name ?? pet.petNome ?? '',
    petNome: pet.petNome ?? pet.name ?? '',
    type: pet.type ?? pet.especie ?? '',
    especie: pet.especie ?? pet.type ?? '',
    breed: pet.breed ?? pet.raca ?? '',
    raca: pet.raca ?? pet.breed ?? '',
    createdAt: pet.createdAt ?? now(),
    updatedAt: now(),
    pendingSync: localOnly || pet.pendingSync === true,
    isLocalOnly: localOnly || pet.isLocalOnly === true,
});

const response = <T>(data: T): AxiosResponse<T> => ({ data } as AxiosResponse<T>);

const isNetworkFailure = (error: unknown) => {
    const message = String((error as { message?: string })?.message ?? '').toLowerCase();
    const code = String((error as { code?: string })?.code ?? '').toUpperCase();
    const status = (error as { response?: { status?: number } })?.response?.status;
    return !status || code === 'ECONNABORTED' || message.includes('network error') || message.includes('timeout') || status >= 500;
};

const notifyOffline = () => showToast('Sem conexão. O pet foi salvo no dispositivo e será sincronizado quando houver internet.', 'info');

const mergePets = (remotePets: PetPayload[], localPets: OfflinePet[]) => {
    const merged = new Map<string, PetPayload | OfflinePet>();
    remotePets.forEach((pet) => {
        if (pet.id) merged.set(String(pet.id), pet);
    });
    localPets.forEach((pet) => merged.set(String(pet.id), pet));
    return [...merged.values()];
};

const list = async () => {
    try {
        await syncOfflinePets();
        const result = await crud.getAll();
        const localPets = await getOfflinePets();
        const remotePets = Array.isArray(result.data) ? result.data : [];
        await Promise.all(remotePets.filter((pet) => pet.id).map((pet) => saveOfflinePet(toPet(pet, String(pet.id), false))));
        return response(mergePets(remotePets, localPets));
    } catch (error) {
        if (!isNetworkFailure(error)) throw error;
        return response(await getOfflinePets());
    }
};

const detail = async (id: string) => {
    const localPet = (await getOfflinePets()).find((item) => item.id === id);
    if (localPet?.isLocalOnly || localPet?.pendingSync) return response(localPet);

    try {
        return await crud.getById(id);
    } catch (error) {
        if (!isNetworkFailure(error)) throw error;
        const pet = (await getOfflinePets()).find((item) => item.id === id) ?? null;
        return response(pet);
    }
};

const create = async (payload: PetPayload) => {
    try {
        const result = await crud.create(payload);
        const saved = toPet(result.data, String(result.data?.id ?? `pet-${Date.now()}`), false);
        await saveOfflinePet({ ...saved, pendingSync: false, isLocalOnly: false });
        return response(result.data);
    } catch (error) {
        if (!isNetworkFailure(error)) throw error;
        const saved = toPet(payload, payload.id ?? `local-${Date.now()}`, true);
        await saveOfflinePet(saved);
        notifyOffline();
        return response(saved);
    }
};

const update = async (id: string, payload: Partial<PetPayload>) => {
    try {
        const result = await crud.update(id, payload);
        const saved = toPet({ ...(result.data as PetPayload), ...payload }, id, false);
        await updateOfflinePet({ ...saved, pendingSync: false, isLocalOnly: false });
        return response(result.data);
    } catch (error) {
        if (!isNetworkFailure(error)) throw error;
        const current = (await getOfflinePets()).find((pet) => pet.id === id);
        const saved = toPet({ ...current, ...payload }, id, true);
        await updateOfflinePet(saved);
        notifyOffline();
        return response(saved);
    }
};

const remove = async (id: string) => {
    try {
        const result = await crud.delete(id);
        await deleteOfflinePet(id);
        return result;
    } catch (error) {
        if (!isNetworkFailure(error)) throw error;
        await deleteOfflinePet(id);
        notifyOffline();
        return response({ id });
    }
};

export const syncOfflinePets = async () => {
    const pendingPets = (await getOfflinePets()).filter((pet) => pet.pendingSync);
    const syncedPets: OfflinePet[] = [];

    for (const pet of pendingPets) {
        try {
            const result = pet.isLocalOnly
                ? await api.post(API_ENDPOINTS.pets.create, pet)
                : await api.put(API_ENDPOINTS.pets.update(pet.id), pet);
            const synced = toPet({ ...pet, ...result.data, id: String(result.data?.id ?? pet.id) }, String(result.data?.id ?? pet.id), false);
            await saveOfflinePet({ ...synced, pendingSync: false, isLocalOnly: false });
            syncedPets.push(synced);
        } catch (error) {
            if (!isNetworkFailure(error)) console.error('[PETS] Falha ao sincronizar pet:', error);
        }
    }

    return syncedPets;
};

export const petService = { ...crud, list, detail, create, update, delete: remove };

export default petService;
