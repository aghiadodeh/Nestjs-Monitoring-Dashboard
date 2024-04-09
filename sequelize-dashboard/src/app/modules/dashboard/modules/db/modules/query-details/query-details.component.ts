import { Component } from '@angular/core';
import { CmsViewDetailsComponent, DataResult, ViewDetailsComponent } from '@x-angular/cms';
import { DatabaseQuery } from '../../models/db.query';
import { CommonModule, DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { MarkdownModule } from 'ngx-markdown';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-query-details',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    DividerModule,
    MarkdownModule,
    TranslateModule,
    CmsViewDetailsComponent,
  ],
  templateUrl: './query-details.component.html',
  styleUrl: './query-details.component.scss'
})
export class QueryDetailsComponent extends ViewDetailsComponent<DatabaseQuery> {
  override title = (item: DatabaseQuery) => item.id;

  protected override setResult(result: DatabaseQuery): void {
    if (typeof result.query == 'string') {
      try {
        result.query = JSON.parse(result.query);
      } catch (_) { }
    }

    if (typeof result.details == 'string') {
      try {
        result.details = JSON.parse(result.details);
      } catch (_) { }
    }

    const sql = result.query?.sql?.toString().replace('Executing (default): ', '');
    result.query.sql = sql;

    this.result = new DataResult(result);
    setTimeout(() => {
      this.pageTitleSerivce.setTitle(this.title(result));
    });
  }
}
