import AsyncStorage from '@react-native-async-storage/async-storage';

export type OfflinePet = {
    id: string;
    createdAt: string;
    updatedAt: string;
    pendingSync: boolean;
    isLocalOnly: boolean;
    [key: string]: unknown;
};

const STORAGE_KEY = '@clyvocare:offline-pets';

const readPets = async (): Promise<OfflinePet[]> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writePets = async (pets: OfflinePet[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
};

export const getOfflinePets = async (): Promise<OfflinePet[]> => readPets();

export const saveOfflinePet = async (pet: OfflinePet): Promise<OfflinePet> => {
    const pets = await readPets();
    const existingIndex = pets.findIndex((item) => item.id === pet.id);
    const nextPets = [...pets];

    if (existingIndex >= 0) nextPets[existingIndex] = pet;
    else nextPets.push(pet);

    await writePets(nextPets);
    return pet;
};

export const updateOfflinePet = async (pet: OfflinePet): Promise<OfflinePet> => saveOfflinePet(pet);

export const deleteOfflinePet = async (id: string): Promise<void> => {
    const pets = await readPets();
    await writePets(pets.filter((pet) => pet.id !== id));
};

export const clearOfflinePets = async (): Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_KEY);
};
