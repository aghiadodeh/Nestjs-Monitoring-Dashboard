export interface Job {
    _id?: string;
    name?: string;
    success?: boolean;
    metadata?: any[];
    createdAt?: string | null;
}