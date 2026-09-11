import { createCrudService } from '../api/crudService';
import { API_ENDPOINTS } from '../api/endpoints';

export type AppointmentPayload = {
    petId: string;
    veterinarian?: string;
    clinic?: string;
    specialty?: string;
    date: string;
    time?: string;
    type?: string;
    status?: string;
    notes?: string;
};

const crud = createCrudService<AppointmentPayload>(API_ENDPOINTS.appointments);
export const appointmentService = { ...crud, list: crud.getAll, detail: crud.getById };

export default appointmentService;
