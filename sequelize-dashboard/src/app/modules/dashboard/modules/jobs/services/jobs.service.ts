import { Injectable } from '@angular/core';
import { CRUDConfiguration, CmsActionEnum, CmsService, FilterSchema, FormSchema } from '@x-angular/cms';
import { Job } from '../models/job.model';
import { DatePipe } from '@angular/common';
import { jobsFilterSchema } from '../configurations/job-filter.schema';

@Injectable()
export class JobsService extends CmsService<Job> {
  protected override withCache: boolean = false;
  
  constructor(private datePipe: DatePipe) {
    super();
  }

  override crudConfiguration: CRUDConfiguration<Job> = {
    endPoints: { index: 'monitoring/sequelize/jobs' },
    actions: { create: () => false },
    tableConfiguration: {
      dataKey: 'id',
      columns: [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'name' },
        { key: 'success', title: 'success', templateRef: true },
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

  override filterSchema: FilterSchema = jobsFilterSchema;

  override formSchema?: FormSchema<Job> | undefined;

  override mapFetchedData = (data: Job[]): Job[] => {
    data.forEach(item => {
      item.createdAt = this.datePipe.transform(item.createdAt, "yyyy-MM-dd HH:mm", "UTC")
    });
    return data;
  };
}
