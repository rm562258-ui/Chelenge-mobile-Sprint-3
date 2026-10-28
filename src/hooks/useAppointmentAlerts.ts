import { useAppointments } from './useAppointments';
import { useNotifications } from './useNotifications';
import { parseAppDate } from '../utils/date';

type AlertItem = {
    id?: string | number;
    title?: string;
    message?: string;
    createdAt?: string;
};

type AppointmentForAlert = {
    id?: string | number;
    date?: string;
    petName?: string;
    status?: string;
};

export function useAppointmentAlerts() {
    const { data, isLoading, isError, refetch } = useNotifications();
    const {
        data: appointments = [],
        isLoading: isAppointmentsLoading,
        refetch: refetchAppointments,
    } = useAppointments();

    const notifications: AlertItem[] = Array.isArray(data) ? data : [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekFromToday = new Date(today);
    weekFromToday.setDate(weekFromToday.getDate() + 7);

    const appointmentAlerts: AlertItem[] = (Array.isArray(appointments) ? appointments : [])
        .filter((appointment: AppointmentForAlert) => appointment.status !== 'Concluída')
        .map((appointment: AppointmentForAlert) => ({
            appointment,
            date: parseAppDate(appointment.date),
        }))
        .filter(({ date }) => date !== null && date >= today && date <= weekFromToday)
        .map(({ appointment }) => ({
            id: `appointment-alert-${appointment.id}`,
            title: 'Consulta programada',
            message: `${appointment.petName || 'Pet'} tem uma consulta marcada para ${appointment.date}.`,
        }));

    const refreshAlerts = async () => {
        await Promise.all([refetch(), refetchAppointments()]);
    };

    return {
        alertItems: [...notifications, ...appointmentAlerts],
        data,
        isError,
        loading: isLoading || isAppointmentsLoading,
        refreshAlerts,
        refetch,
    };
}
