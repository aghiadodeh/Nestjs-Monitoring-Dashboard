import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CmsListComponent } from '@x-angular/cms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-queries-list',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    CmsListComponent,
  ],
  templateUrl: './queries-list.component.html',
  styleUrl: './queries-list.component.scss'
})
export class QueriesListComponent {}
