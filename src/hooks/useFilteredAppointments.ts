import { useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

type FilterableAppointment = {
    date?: string;
    id?: string | number;
    petName?: string;
    status?: string;
    title?: string;
    type?: string;
};

export function useFilteredAppointments(appointments: FilterableAppointment[]) {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const debouncedQuery = useDebouncedValue(query);

    const items = appointments.filter((item) => {
        const matchesQuery = `${item.title || ''} ${item.type || ''} ${item.petName || ''}`
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase());
        return matchesQuery && (!status || item.status === status);
    });

    const toggleStatus = () => setStatus((currentStatus) => currentStatus ? '' : 'Agendada');

    return { items, query, setQuery, status, toggleStatus };
}
