import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobsService } from './services/jobs.service';
import { Job } from './models/job.model';
import { CmsService } from '@x-angular/cms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  providers: [
    DatePipe,
    JobsService,
    {
      provide: CmsService<Job>,
      useExisting: JobsService,
    },
  ]
})
export class JobsComponent { }
