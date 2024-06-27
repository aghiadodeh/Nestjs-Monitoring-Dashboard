import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { MarkdownModule } from 'ngx-markdown';
import { TranslateModule } from '@ngx-translate/core';
import { CmsViewDetailsComponent, ViewDetailsComponent } from '@x-angular/cms';
import { Job } from '../../models/job.model';
import { NewlineJsonPipe } from '../../../../../../core/pipes/newline-json.pipe';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    DividerModule,
    MarkdownModule,
    TranslateModule,
    CmsViewDetailsComponent,
    NewlineJsonPipe,
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent extends ViewDetailsComponent<Job> {
  override title = (item: Job): string => `${item.name}`;

  protected override setResult(result: Job): void {
    super.setResult(result);
  }
}
