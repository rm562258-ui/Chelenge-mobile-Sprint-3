import { Pet } from '@/types';

const petsSeed: Pet[] = [
  { id: '1', name: 'Luna', type: 'Cachorro', breed: 'Shih Tzu', age: 4, weight: 8.5 },
  { id: '2', name: 'Milo', type: 'Gato', breed: 'Siamês', age: 2, weight: 3.2 },
];

export const petsService = {
  getPets: async () => petsSeed,
  getPetById: async (id: string) => petsSeed.find((pet) => pet.id === id) ?? null,
  createPet: async (pet: Pet) => pet,
  updatePet: async (pet: Pet) => pet,
};
