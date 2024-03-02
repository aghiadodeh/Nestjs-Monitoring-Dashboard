import { Component } from '@angular/core';
import { CmsListComponent } from '@x-angular/cms';

@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [CmsListComponent],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.scss'
})
export class RequestsListComponent { }
