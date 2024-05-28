import { Component, OnInit } from '@angular/core';
import { AnalyzeService } from './services/analyze.service';
import { DestroyedComponent } from '@x-angular/cms';
import { finalize, skip, takeUntil } from 'rxjs';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { AnalyzeFilterComponent } from './components/analyze-filter/analyze-filter.component';
import { CommonModule } from '@angular/common';
import { AnalyzeChartsComponent } from './components/analyze-charts/analyze-charts.component';

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ProgressBarModule,
    AnalyzeChartsComponent,
    AnalyzeFilterComponent,
  ],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.scss',
  providers: [
    AnalyzeService,
  ]
})
export class AnalyzeComponent extends DestroyedComponent implements OnInit {
  constructor(public analyzeService: AnalyzeService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.analyzeService.filterSchema$
      .pipe(skip(1), takeUntil(this.destroyed))
      .subscribe(() => {
        this.getRequestsAnalyze();
      });
  }

  private getRequestsAnalyze(): void {
    this.analyzeService.getRequestsAnalyze()
      .pipe(
        takeUntil(this.destroyed),
        finalize(() => this.analyzeService.requestAnalyze.setLoading(false)),
      )
      .subscribe({
        next: (data) => {
          this.analyzeService.requestAnalyze.setData(data);
        }
      });
  }
}
