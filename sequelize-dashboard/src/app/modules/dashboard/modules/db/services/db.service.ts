import { Injectable } from "@angular/core";
import { CRUDConfiguration, CmsActionEnum, CmsService, FilterSchema, FormSchema } from "@x-angular/cms";
import { DatabaseQuery } from "../models/db.query";
import { DatePipe } from "@angular/common";
import { dbFilterSchema } from "../configurations/db-filter.schema";

@Injectable()
export class DbService extends CmsService<DatabaseQuery> {
    protected override withCache: boolean = false;

    constructor(private datePipe: DatePipe) {
        super();
    }

    override crudConfiguration: CRUDConfiguration<DatabaseQuery> = {
        endPoints: {
            index: 'monitoring/sequelize/db-logs',
            view: (id) => `monitoring/sequelize/db-logs/view/${id}`,
        },
        actions: { create: () => false },
        tableConfiguration: {
            dataKey: '_id',
            columns: [
                { key: 'table', title: 'table_name' },
                { key: 'query', title: 'query', templateRef: true },
                { key: 'createdAt', title: 'createdAt' },
            ],
            actions: () => [
                {
                    key: CmsActionEnum.view_new_tab,
                    label: 'view',
                    icon: 'pi pi-eye',
                }
            ],
        },
    };

    override filterSchema: FilterSchema = dbFilterSchema;

    override formSchema?: FormSchema<DatabaseQuery> | undefined;

    override mapFetchedData = (data: DatabaseQuery[]): DatabaseQuery[] => {
        data.forEach(dbQuery => {
            dbQuery.createdAt = this.datePipe.transform(dbQuery.createdAt, "yyyy-MM-dd HH:mm", "UTC")
        });
        return data;
    };
}