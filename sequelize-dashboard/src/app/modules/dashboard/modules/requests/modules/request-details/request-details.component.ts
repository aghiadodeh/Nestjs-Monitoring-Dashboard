import { Component } from '@angular/core';
import { CmsViewDetailsComponent, DataResult, ViewDetailsComponent } from '@x-angular/cms';
import { RequestLog } from '../../models/request.model';
import { CommonModule, DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { MarkdownModule } from 'ngx-markdown';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    DividerModule,
    MarkdownModule,
    TranslateModule,
    CmsViewDetailsComponent,
  ],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss',
})
export class RequestDetailsComponent extends ViewDetailsComponent<RequestLog> {
  public baseUrl = environment.SERVER_BASE_URL;
  public requestInfo = {};
  public responseInfo = {};
  public exception: any;
  override title = (item: RequestLog) => item.url ?? "";

  protected override setResult(result: RequestLog): void {
    this.result = new DataResult(result);
    const { request, response } = result;

    this.exception = response?.exception;

    this.requestInfo = {
      ip: request?.ip,
      datetime: request?.datetime,
      url: request?.url,
      method: request?.method,
      user: request?.user,
    };

    this.responseInfo = {
      datetime: response?.datetime,
      duration: result.duration,
    }
    delete response?.exception;
    delete response?.datetime;

    setTimeout(() => {
      this.pageTitleSerivce.setTitle(this.title(result));
    });
  }
}
