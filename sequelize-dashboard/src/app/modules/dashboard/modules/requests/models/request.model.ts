export interface RequestLog {
    id?: string;
    key?: string;
    url?: string;
    method?: string;
    request?: Request;
    response?: Response;
    responseHeaders?: any;
    success?: boolean;
    duration?: number;
    createdAt?: string | null;
    updatedAt?: string;
}

export interface Request {
    ip?: string;
    headers?: any;
    url?: string;
    method?: string;
    queries?: any;
    body?: any;
    datetime?: string;
    user?: User;
}

export interface User {
    id?: string;
}

export interface Response {
    statusCode?: number;
    success?: boolean;
    message?: string;
    data?: any;
    exception?: string;
    datetime?: string;
}
