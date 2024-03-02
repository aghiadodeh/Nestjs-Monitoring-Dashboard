import { Injectable } from "@angular/core";
import { CommonHttpService, LoadingResult } from "@x-angular/cms";
import { environment } from "../../../../../environments/environment";
import { AnalyzeFilterDto } from "../dto/analyze-filter.dto";
import { BehaviorSubject, Observable, map } from "rxjs";
import { AnalyzeRequestResponse } from "../models/analyze-request.response";

@Injectable()
export class AnalyzeService extends CommonHttpService {
    public requestAnalyze = new LoadingResult<AnalyzeRequestResponse>();
    public filterSchema$ = new BehaviorSubject<AnalyzeFilterDto>({});

    constructor() {
        super(`${environment.API_URL}/monitoring/sequelize`);
    }

    public getRequestsAnalyze(): Observable<AnalyzeRequestResponse> {
        return this.get<AnalyzeRequestResponse>('requests/analyze', { params: this.filterSchema$.value }).pipe(
            map(response => response.data),
        )
    }

    public applyFilters(filterDto: AnalyzeFilterDto) {
        this.filterSchema$.next(filterDto);
    }
}