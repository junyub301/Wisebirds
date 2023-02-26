export interface Me {
    id: number;
    email: string;
    name: string;
    company: { id: number; name: string };
}

export interface User {
    id: string;
    email: string;
    name: string;
    last_login_at: string;
}
