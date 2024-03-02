export interface Job {
    id?: string;
    name?: string;
    success?: boolean;
    metadata?: any[];
    createdAt?: string | null;
}