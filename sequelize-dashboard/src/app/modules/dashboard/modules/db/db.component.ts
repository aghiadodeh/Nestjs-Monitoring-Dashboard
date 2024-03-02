import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DbService } from './services/db.service';
import { DatabaseQuery } from './models/db.query';
import { CmsService } from '@x-angular/cms';

@Component({
  selector: 'app-db',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './db.component.html',
  styleUrl: './db.component.scss',
  providers: [
    DatePipe,
    DbService,
    {
      provide: CmsService<DatabaseQuery>,
      useExisting: DbService,
    },
  ]
})
export class DbComponent { }
