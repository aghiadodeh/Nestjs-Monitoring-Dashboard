import { FilterInputType, FilterSchema } from "@x-angular/cms";
import moment from 'moment-timezone';

export const analyzeFilterSchema: FilterSchema = {
    filterDto: {},
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
    ],
};