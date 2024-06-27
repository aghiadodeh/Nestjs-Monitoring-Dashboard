export interface DatabaseQuery {
    query?: any;
    update?: any;
    duration?: number;
    options?: any;
    _id?: string;
    collectionName?: string;
    method?: string;
    createdAt?: string | null;
}