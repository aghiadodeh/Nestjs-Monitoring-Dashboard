import { Component } from '@angular/core';
import { CmsViewDetailsComponent, ViewDetailsComponent } from '@x-angular/cms';
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
  override title = (item: DatabaseQuery) => `${item.collectionName}.${item.method}()`;
}
