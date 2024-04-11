import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { MarkdownModule } from 'ngx-markdown';
import { TranslateModule } from '@ngx-translate/core';
import { CmsViewDetailsComponent, DataResult, ViewDetailsComponent } from '@x-angular/cms';
import { Job } from '../../models/job.model';

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
  ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent extends ViewDetailsComponent<Job> {
  override title = (item: Job): string => `${item.name}`;

  protected override setResult(result: Job): void {
    if (typeof result.metadata == 'string') {
      try {
        result.metadata = JSON.parse(result.metadata);
      } catch (_) { }
    }
    this.result = new DataResult(result);

    setTimeout(() => {
      this.pageTitleService.setTitle(this.title(result));
    });
  }
}
