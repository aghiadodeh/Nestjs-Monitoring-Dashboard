import { Component } from '@angular/core';
import { CmsListComponent } from '@x-angular/cms';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [CmsListComponent],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss'
})
export class JobsListComponent {}
