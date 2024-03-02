import { FilterInputType, FilterSchema, defaultFilterDto } from "@x-angular/cms";
import moment from 'moment-timezone';

export const dbFilterSchema: FilterSchema = {
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
            key: 'collectionName',
            label: 'collection_name',
            inputType: FilterInputType.multiSelect,
            mutliSelectConfiguration: {
                valueBy: '',
                filterBy: '',
                optionLabel: '',
                options: [],
                remoteDataConfiguration: {
                    endPoint: 'monitoring/mongoose/mongo-logs-options',
                    mapHttpResponse: (response: any) => response.data.collectionNames,
                },
            },
        },
        {
            key: 'method',
            label: 'method',
            inputType: FilterInputType.multiSelect,
            mutliSelectConfiguration: {
                valueBy: '',
                filterBy: '',
                optionLabel: '',
                options: [],
                remoteDataConfiguration: {
                    endPoint: 'monitoring/mongoose/mongo-logs-options',
                    mapHttpResponse: (response: any) => response.data.methods,
                },
            },
        },
    ],
};