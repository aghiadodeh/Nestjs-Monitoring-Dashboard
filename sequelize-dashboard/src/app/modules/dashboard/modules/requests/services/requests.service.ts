import { Injectable } from "@angular/core";
import { BaseTableColumn, CRUDConfiguration, CmsActionEnum, CmsService, FormSchema, defaultFilterDto } from "@x-angular/cms";
import { RequestLog } from "../models/request.model";
import { RequestsFilterSchema, requestsFilterSchema } from "../configurations/requests-filter.schema";
import { DatePipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class RequestsService extends CmsService<RequestLog> {
    override withCache: boolean = false;
    private get exception(): boolean {
        return this.activatedRoute.snapshot.data['exception'] == true;
    }
    constructor(private activatedRoute: ActivatedRoute, private datePipe: DatePipe) {
        super();
    }

    override crudConfiguration: CRUDConfiguration<RequestLog> = {
        endPoints: {
            index: 'monitoring/sequelize/requests',
            view: (id) => `monitoring/sequelize/requests/view/${id}`
        },
        actions: { create: () => false },
        tableConfiguration: {
            dataKey: 'id',
            columns: this.columns(),
            actions: () => [
                {
                    key: CmsActionEnum.view_new_tab,
                    label: 'view',
                    icon: 'pi pi-eye',
                }
            ],
        },
    };
    private columns(): BaseTableColumn<RequestLog>[] {
        const columns: BaseTableColumn<RequestLog>[] = [
            { key: 'request.user.id', title: 'user' },
            { key: 'method', title: 'method' },
            { key: 'url', title: 'url' },
            {
                key: 'response.statusCode', title: 'statusCode', ngStyleFn: (item: RequestLog) => {
                    return {
                        'color': item.success == false ? 'red' : 'green',
                    }
                }
            },
            { key: 'duration', title: 'duration-ms' },
            { key: 'createdAt', title: 'createdAt' },
        ];
        if (!this.exception) {
            columns.push({ key: 'success', title: 'success', templateRef: true })
        }

        return columns;
    }

    override filterSchema: RequestsFilterSchema = !this.exception ? requestsFilterSchema : {
        ...requestsFilterSchema,
        filterDto: { ...defaultFilterDto, exception: 'true' },
    };

    override formSchema?: FormSchema<RequestLog> | undefined;

    override mapFetchedData = (data: RequestLog[]): RequestLog[] => {
        data.forEach(request => {
            request.createdAt = this.datePipe.transform(request.createdAt, "yyyy-MM-dd HH:mm", "UTC")
        });
        return data;
    };
}