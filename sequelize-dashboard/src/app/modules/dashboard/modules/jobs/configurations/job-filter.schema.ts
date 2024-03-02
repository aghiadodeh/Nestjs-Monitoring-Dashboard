import { FilterInputType, FilterSchema, defaultFilterDto } from "@x-angular/cms";
import moment from 'moment-timezone';

export const jobsFilterSchema: FilterSchema = {
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
            key: 'name',
            label: 'name',
            inputType: FilterInputType.text,
        },
    ],
};