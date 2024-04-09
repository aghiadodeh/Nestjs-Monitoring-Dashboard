export interface AnalyzeRequestResponse {
    fromDate?: string;
    toDate?: string;
    total?: number;
    success?: number;
    errors?: number;
    exceptions?: number;
    duration?: RequestDuration[];
    durationURLs?: RequestURLDuration[];
    createdAt?: RequestCreatedAt[];
    durationBoundaries?: number[];
}

export interface RequestCreatedAt {
    id?: string;
    count?: number;
    data?: AnalyzeRequest[];
}

export interface AnalyzeRequest {
    duration: number;
    method?: string;
    url?: string;
    createdAt?: string;
}

export interface RequestDuration {
    id?: number;
    count?: number;
    data?: AnalyzeRequest[];
}

export interface RequestURLDuration {
    max?: number;
    min?: number;
    url?: string;
    method?: string;
}