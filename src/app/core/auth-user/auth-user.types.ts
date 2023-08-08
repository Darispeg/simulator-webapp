export interface AuthUser
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    authorities?: string[];
}