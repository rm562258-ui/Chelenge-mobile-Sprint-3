import { createCrudService } from '../api/crudService';
import { API_ENDPOINTS } from '../api/endpoints';

export type NotificationPayload = {
    title: string;
    message: string;
    type?: string;
    read?: boolean;
    createdAt?: string;
};

const notificationService = createCrudService<NotificationPayload>(API_ENDPOINTS.notifications);

export default notificationService;