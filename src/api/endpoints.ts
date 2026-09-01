export const API_ENDPOINTS = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        me: '/auth/me',
    },
    pets: {
        list: '/pets',
        create: '/pets',
        detail: (id: string) => `/pets/${id}`,
        update: (id: string) => `/pets/${id}`,
        delete: (id: string) => `/pets/${id}`,
    },
    alerts: {
        list: '/alerts',
        create: '/alerts',
    },
};
