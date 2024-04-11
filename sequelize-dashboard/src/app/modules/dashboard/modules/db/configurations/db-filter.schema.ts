import { FilterInputType, FilterSchema, defaultFilterDto } from "@x-angular/cms";
import moment from 'moment-timezone';

export const dbFilterSchema = (): FilterSchema => {
    return {
        filterDto: defaultFilterDto,
        inputs: [
            {
                key: 'fromDate',
                label: 'from_date',
                value: moment().subtract(1, 'day').toDate(),
                inputType: FilterInputType.datetime,
            },
            {
                key: 'toDate',
                label: 'to_date',
                value: moment().toDate(),
                inputType: FilterInputType.datetime,
            },
            {
                key: 'tableName',
                label: 'table_name',
                inputType: FilterInputType.multiSelect,
                multiSelectConfiguration: {
                    valueBy: '',
                    filterBy: '',
                    optionLabel: '',
                    options: [],
                    remoteDataConfiguration: {
                        endPoint: 'monitoring/sequelize/db-logs-options',
                        mapHttpResponse: (response: any) => response.data.tableNames,
                    },
                },
            },
        ],
    };
}