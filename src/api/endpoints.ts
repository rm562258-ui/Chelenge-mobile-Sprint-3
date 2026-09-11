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
    notifications: {
        list: '/notifications',
        create: '/notifications',
        detail: (id: string) => `/notifications/${id}`,
        update: (id: string) => `/notifications/${id}`,
        delete: (id: string) => `/notifications/${id}`,
    },
    ai: {
        history: {
            list: '/aiHistory',
            create: '/aiHistory',
            detail: (id: string) => `/aiHistory/${id}`,
            update: (id: string) => `/aiHistory/${id}`,
            delete: (id: string) => `/aiHistory/${id}`,
        },
    },
    appointments: {
        list: '/appointments',
        create: '/appointments',
        detail: (id: string) => `/appointments/${id}`,
        update: (id: string) => `/appointments/${id}`,
        delete: (id: string) => `/appointments/${id}`,
    },
    vaccines: {
        list: '/vaccines',
        create: '/vaccines',
        detail: (id: string) => `/vaccines/${id}`,
        update: (id: string) => `/vaccines/${id}`,
        delete: (id: string) => `/vaccines/${id}`,
    },
    medications: {
        list: '/medications',
        create: '/medications',
        detail: (id: string) => `/medications/${id}`,
        update: (id: string) => `/medications/${id}`,
        delete: (id: string) => `/medications/${id}`,
    },
};
