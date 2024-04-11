import { BaseFilterDto, FilterInputType, FilterSchema, defaultFilterDto } from "@x-angular/cms";
import moment from 'moment-timezone';

export interface RequestsFilterSchema extends FilterSchema {
    filterDto: RequestFilterDto;
}

export interface RequestFilterDto extends BaseFilterDto {
    exception?: 'true' | 'false';
}

export const requestFilterDto: RequestFilterDto = defaultFilterDto;

export const requestsFilterSchema = (): RequestsFilterSchema => {
    return {
        filterDto: requestFilterDto,
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
                key: 'url',
                label: 'url',
                inputType: FilterInputType.text,
            },
            {
                key: 'user',
                label: 'user',
                inputType: FilterInputType.text,
            },
            {
                key: 'method',
                label: 'method',
                value: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                inputType: FilterInputType.multiSelect,
                multiSelectConfiguration: {
                    filterBy: '',
                    optionLabel: '',
                    valueBy: '',
                    options: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                },
            },
        ],
    };
} 