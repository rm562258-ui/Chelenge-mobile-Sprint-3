import AsyncStorage from '@react-native-async-storage/async-storage';

export type OfflineAppointment = {
    id: string;
    createdAt: string;
    updatedAt: string;
    pendingSync: boolean;
    isLocalOnly: boolean;
    [key: string]: unknown;
};

const STORAGE_KEY = '@clyvocare:offline-appointments';

const readAppointments = async (): Promise<OfflineAppointment[]> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeAppointments = async (appointments: OfflineAppointment[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const getOfflineAppointments = async (): Promise<OfflineAppointment[]> => readAppointments();

export const saveOfflineAppointment = async (appointment: OfflineAppointment) => {
    const appointments = await readAppointments();
    const index = appointments.findIndex((item) => item.id === appointment.id);
    const nextAppointments = [...appointments];

    if (index >= 0) nextAppointments[index] = appointment;
    else nextAppointments.push(appointment);

    await writeAppointments(nextAppointments);
    return appointment;
};

export const updateOfflineAppointment = async (appointment: OfflineAppointment) => saveOfflineAppointment(appointment);

export const deleteOfflineAppointment = async (id: string) => {
    const appointments = await readAppointments();
    await writeAppointments(appointments.filter((appointment) => appointment.id !== id));
};

export const clearOfflineAppointments = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
};
