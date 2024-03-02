import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequestsService } from './services/requests.service';
import { RequestLog } from './models/request.model';
import { CmsService } from '@x-angular/cms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
  providers: [
    DatePipe,
    RequestsService,
    {
      provide: CmsService<RequestLog>,
      useExisting: RequestsService,
    },
  ]
})
export class RequestsComponent {}
