export type ApiError = {
    message?: string;
    status?: number;
    code?: string;
};

export type UserProfile = {
    petNome: string;
    especie: string;
    raca: string;
    idade: string;
    peso: string;
    tutorNome: string;
    contatoTutor: string;
    clinica: string;
    cuidadoPrincipal: string;
    foto?: string | null;
    lembretesAtivos: boolean;
    canalPreferido: string;
};

export type Pet = {
    id?: string;
    name: string;
    type?: string;
    breed?: string;
    age?: number | string;
    weight?: number | string;
    ownerName?: string;
    contact?: string;
};

export type AuthTokens = {
    accessToken?: string;
    refreshToken?: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
};

export type Appointment = {
    id: string;
    petId: string;
    petName: string;
    date: string;
    time: string;
    reason: string;
    status: 'confirmed' | 'pending' | 'cancelled';
};

export type Medication = {
    id: string;
    petId: string;
    petName: string;
    name: string;
    dosage: string;
    frequency: string;
    active: boolean;
};

export type Vaccine = {
    id: string;
    petId: string;
    petName: string;
    name: string;
    dueDate: string;
    status: 'pending' | 'completed';
};
