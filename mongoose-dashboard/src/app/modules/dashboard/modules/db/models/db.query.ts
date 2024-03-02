export interface DatabaseQuery {
    query?: any;
    options?: any;
    _id?: string;
    collectionName?: string;
    method?: string;
    createdAt?: string | null;
}