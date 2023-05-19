export interface IUserProfile {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
    id: number;
}

export interface IUserProfileUpdate {
    email?: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfileCreate {
    email: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IFeedbackCreate {
    score?: number,
    type?: string,
}

/* Ticket */
export interface ITicket {
    title: string,
    description: string,
    id: number,
    owner_id: number
}

export interface ITicketCreate {
    title?: string,
    description?: string,
}

export interface ITicketUpdate {
    title?: string,
    description?: string,
    id: number,
    owner_id?: number
}